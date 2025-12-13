import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { HubSpotPrequalForm } from "./HubSpotPrequalForm";
import HubSpotEFFormClean from "@/components/forms/HubSpotEFFormClean";
import FormShellMCA from "@/components/forms/FormShellMCA";
import { useABTest } from "@/hooks/useABTest";
import { useEFFormConfig, EF_FORM_CONFIG } from "@/hooks/useEFFormConfig";
import { Shield, Clock, CheckCircle2, Users, Star, TrendingUp, Award, Zap } from "lucide-react";

const STORAGE_KEY = "wispfi_exit_intent_shown_v2";

const shouldShow = () => {
  try {
    return !sessionStorage.getItem(STORAGE_KEY);
  } catch {
    return true;
  }
};

// Variant A: Loss Aversion (Current approach)
const VariantA = () => (
  <></>
);

// Variant B: Action/Urgency Focused
const VariantB = () => (
  <></>
);

// Variant C: Social Proof Focused
const VariantC = () => (
  <></>
);

export const ABTestExitIntentModal = () => {
  // TEMP: fully disabled while we stabilize the hero MCA form.
  return null;
};