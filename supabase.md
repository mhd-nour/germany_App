📘 Supabase Setup Documentation

Project: LernDeutsch AI

This document describes the exact steps taken to initialize, configure, and secure the Supabase backend for the LernDeutsch AI project.

Step 1: Initialize the Project
1.1 Create a Supabase Project

Open the Supabase Dashboard

Create a new project

1.2 Save Credentials Securely

After project creation, securely store:

Project Password

Anon API Key

Service Role API Key

⚠️ These keys are required for backend access and must never be exposed publicly.

1.3 Set Project Region

Region selected: Frankfurt (eu-central-1)

Reason:
This is a Germany-focused application. Hosting in Frankfurt reduces latency and improves performance for target users.

Step 2: Define the Database Schema (SQL Editor)

All database structures are created using the Supabase SQL Editor.

2.1 Purpose

This schema:

Enforces strict data integrity

Matches FR-3.2 and FR-5 functional requirements

Prevents duplicate vocabulary entries

Links all user data to Supabase Auth users

2.2 Create Custom ENUM Types

These ENUMs restrict allowed values and ensure consistent data.

CREATE TYPE word_category AS ENUM ('Noun', 'Verb', 'Adjective', 'Adverb', 'Phrase');
CREATE TYPE mastery_status AS ENUM ('New', 'Learning', 'Reviewing', 'Mastered');
CREATE TYPE gender_article AS ENUM ('der', 'die', 'das');
CREATE TYPE helper_verb AS ENUM ('haben', 'sein');

2.3 Create the vocabulary Table

This table stores all extracted and learned vocabulary per user.

CREATE TABLE vocabulary (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  word TEXT NOT NULL,
  article gender_article,
  plural TEXT,
  helper_verb helper_verb,
  past_participle TEXT,
  translation TEXT NOT NULL,
  example TEXT,
  category word_category NOT NULL,
  status mastery_status DEFAULT 'New',
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Prevent exact duplicates for the same user (FR-2.2)
  UNIQUE(user_id, word, category)
);

Key Design Decisions

Each vocabulary entry belongs to one authenticated user

UNIQUE(user_id, word, category) prevents duplicate entries per user

Optional grammar fields support German language structure

image_url links extracted vocabulary back to source images

2.4 Create the profiles Table

This table stores user profile data and supports FR-6 (User Management).

CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

Step 3: Security & Row Level Security (RLS)
3.1 Purpose

To satisfy FR-6.3, users must never see or modify other users’ data.

3.2 Enable Row Level Security

RLS is enabled on both tables.

ALTER TABLE vocabulary ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

3.3 Create Vocabulary Access Policy

Policy rule:
Users can only see, insert, update, or delete their own vocabulary entries.

CREATE POLICY "Users can manage their own vocabulary" 
ON vocabulary FOR ALL 
USING (auth.uid() = user_id);

Effect

Full isolation between users

Every query is automatically filtered by auth.uid()

No client-side filtering required

Step 4: Storage Setup (FR-1.1 – Image Capture)

The app captures images of German text before Gemini processing.

4.1 Create Storage Bucket

Navigate to Storage in the Supabase sidebar

Create a new bucket named:
source-images

Set bucket visibility to Private

Reason:
Only the uploading user should be able to access their images.

Step 5: Storage Policies (Detailed Setup)
Purpose

Ensure users:

Can upload images

Can view only their own uploaded images

Cannot access other users’ files

5.1 Locate the Policies Section

Log in to the Supabase Dashboard

Click Storage in the left sidebar

Select the source-images bucket

Click Policies under the Storage section

5.2 Create the "Insert" (Upload) Policy

This policy allows users to upload their own images.

Click New Policy

Choose For full customization

Configuration:

Policy Name: Allow authenticated uploads

Allowed Operations: INSERT

Target Roles: authenticated

Check Expression:

auth.uid() = owner


Meaning:
The authenticated user ID must match the file owner.

Click Review → Save

5.3 Create the "Select" (View) Policy

Without this policy, users could upload images but not view them.

Click New Policy

Choose For full customization

Configuration:

Policy Name: Allow users to view own images

Allowed Operations: SELECT

Target Roles: authenticated

Check Expression:

auth.uid() = owner


Click Review → Save

5.4 Storage Policy Summary
Policy Type	Operation	Who Can Do It	Which Files
Insert	Upload	Authenticated users	Only files they own
Select	View	Authenticated users	Only files they uploaded
✅ Final Result

After completing these steps:

Each user has fully isolated data

Vocabulary is structured, validated, and duplicate-safe

Images are securely stored and access-controlled

The backend fully supports OCR + Gemini processing

Supabase Auth, Database, RLS, and Storage are correctly integrated
