import { useState } from "react";
import { Camera, CheckCircle2, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Progress } from "../../../components/ui/progress";
import { ErrorState } from "../../../components/common/ErrorState";
import { LoadingState } from "../../../components/common/LoadingState";
import { useFaceVerificationQuery } from "../hooks/useApplicantPortalQueries";

export default function FaceVerificationPage() {
  const { data, isLoading, isError } = useFaceVerificationQuery();
  const [status, setStatus] = useState<"idle" | "capturing" | "verified" | "failed">("idle");
  const [score, setScore] = useState(0);

  if (isLoading) return <LoadingState label="Loading face verification..." />;
  if (isError || !data) {
    return <ErrorState title="Unable to load face verification" onRetry={() => window.location.reload()} />;
  }

  const startCapture = () => {
    setStatus("capturing");
    setTimeout(() => {
      const simulatedScore = 91;
      setScore(simulatedScore);
      setStatus(simulatedScore >= 85 ? "verified" : "failed");
    }, 900);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Face Verification</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50">
          <div className="text-center">
            <Camera className="mx-auto mb-2 h-8 w-8 text-slate-500" />
            <p className="text-sm text-slate-600">Camera capture preview area</p>
            <p className="text-xs text-slate-500">{data.message}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button onClick={startCapture} disabled={status === "capturing"}>
            {status === "capturing" ? "Capturing..." : "Capture & Verify"}
          </Button>
          {status === "verified" ? (
            <span className="inline-flex items-center gap-1 text-sm font-medium text-emerald-700">
              <CheckCircle2 className="h-4 w-4" /> Verified
            </span>
          ) : null}
          {status === "failed" ? (
            <span className="inline-flex items-center gap-1 text-sm font-medium text-red-700">
              <XCircle className="h-4 w-4" /> Verification failed
            </span>
          ) : null}
        </div>

        <Progress label="Verification confidence" value={score} showPercentage variant={status === "failed" ? "error" : "success"} />
      </CardContent>
    </Card>
  );
}
