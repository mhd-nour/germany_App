/**
 * LernDeutsch AI - Camera Screen
 */

import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Camera, CameraType } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { ScreenContainer, Button } from "../../components";
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS } from "../../theme";
import type { CaptureStackParamList } from "../../types";

type CameraNavigationProp = NativeStackNavigationProp<
  CaptureStackParamList,
  "Camera"
>;

const CameraScreen: React.FC = () => {
  const navigation = useNavigation<CameraNavigationProp>();
  const cameraRef = useRef<Camera>(null);

  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>(CameraType.back);
  const [isCapturing, setIsCapturing] = useState(false);

  if (!permission) {
    return (
      <ScreenContainer>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading camera...</Text>
        </View>
      </ScreenContainer>
    );
  }

  if (!permission.granted) {
    return (
      <ScreenContainer>
        <View style={styles.permissionContainer}>
          <View style={styles.permissionIcon}>
            <Ionicons
              name="camera-outline"
              size={64}
              color={COLORS.text.disabled}
            />
          </View>
          <Text style={styles.permissionTitle}>Camera Permission Required</Text>
          <Text style={styles.permissionText}>
            LernDeutsch AI needs access to your camera to capture images of
            German text.
          </Text>
          <Button
            title="Grant Permission"
            onPress={requestPermission}
            variant="primary"
            style={styles.permissionButton}
          />
          <Button
            title="Go Back"
            onPress={() => navigation.goBack()}
            variant="ghost"
          />
        </View>
      </ScreenContainer>
    );
  }

  const handleCapture = async () => {
    if (!cameraRef.current || isCapturing) return;

    setIsCapturing(true);
    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: false,
      });

      if (photo?.uri) {
        navigation.navigate("Processing", { imageUri: photo.uri });
      }
    } catch (error) {
      console.error("Capture error:", error);
      Alert.alert("Error", "Failed to capture image. Please try again.");
    } finally {
      setIsCapturing(false);
    }
  };

  const toggleCameraFacing = () => {
    setFacing((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back,
    );
  };

  return (
    <View style={styles.container}>
      <Camera ref={cameraRef} style={styles.camera} type={facing}>
        {/* Top Controls */}
        <View style={styles.topControls}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="close" size={28} color={COLORS.white} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={toggleCameraFacing}
          >
            <Ionicons name="camera-reverse" size={28} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        {/* Viewfinder Overlay */}
        <View style={styles.viewfinderContainer}>
          <View style={styles.viewfinder}>
            <View style={[styles.corner, styles.cornerTL]} />
            <View style={[styles.corner, styles.cornerTR]} />
            <View style={[styles.corner, styles.cornerBL]} />
            <View style={[styles.corner, styles.cornerBR]} />
          </View>
          <Text style={styles.viewfinderText}>
            Position German text within the frame
          </Text>
        </View>

        {/* Bottom Controls */}
        <View style={styles.bottomControls}>
          <View style={styles.controlsSpacer} />

          <TouchableOpacity
            style={styles.captureButton}
            onPress={handleCapture}
            disabled={isCapturing}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={COLORS.primary.gradient}
              style={styles.captureGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              {isCapturing ? (
                <View style={styles.capturingIndicator} />
              ) : (
                <Ionicons name="camera" size={32} color={COLORS.white} />
              )}
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.controlsSpacer} />
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  camera: {
    flex: 1,
  },
  // Loading / Permission States
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    ...TYPOGRAPHY.body,
    color: COLORS.text.muted,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SPACING.xl,
  },
  permissionIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.surface.secondary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.xl,
  },
  permissionTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text.primary,
    textAlign: "center",
    marginBottom: SPACING.md,
  },
  permissionText: {
    ...TYPOGRAPHY.body,
    color: COLORS.text.muted,
    textAlign: "center",
    marginBottom: SPACING.xl,
  },
  permissionButton: {
    marginBottom: SPACING.md,
    minWidth: 200,
  },
  // Top Controls
  topControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: SPACING["4xl"],
    paddingHorizontal: SPACING.lg,
  },
  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  // Viewfinder
  viewfinderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  viewfinder: {
    width: "85%",
    aspectRatio: 4 / 3,
    position: "relative",
  },
  corner: {
    position: "absolute",
    width: 30,
    height: 30,
    borderColor: COLORS.primary.default,
    borderWidth: 3,
  },
  cornerTL: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderTopLeftRadius: 8,
  },
  cornerTR: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderTopRightRadius: 8,
  },
  cornerBL: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomLeftRadius: 8,
  },
  cornerBR: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomRightRadius: 8,
  },
  viewfinderText: {
    ...TYPOGRAPHY.body,
    color: COLORS.white,
    textAlign: "center",
    marginTop: SPACING.lg,
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.base,
    borderRadius: RADIUS.md,
  },
  // Bottom Controls
  bottomControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: SPACING["3xl"],
    paddingHorizontal: SPACING.xl,
  },
  controlsSpacer: {
    flex: 1,
  },
  captureButton: {
    borderRadius: 40,
    ...SHADOWS.lg,
  },
  captureGradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: COLORS.white,
  },
  capturingIndicator: {
    width: 24,
    height: 24,
    borderRadius: 4,
    backgroundColor: COLORS.white,
  },
});

export default CameraScreen;
