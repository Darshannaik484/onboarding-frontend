import { ZoomIn, ZoomOut } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { useUiStore } from "../../../store/ui.store";

export default function DocumentViewerPage() {
  const zoom = useUiStore((state) => state.documentViewerZoom);
  const setZoom = useUiStore((state) => state.setDocumentViewerZoom);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-3">
        <CardTitle className="text-lg">Document Viewer</CardTitle>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setZoom(Math.max(50, zoom - 10))}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm text-slate-600">{zoom}%</span>
          <Button variant="outline" onClick={() => setZoom(Math.min(200, zoom + 10))}>
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex h-96 items-center justify-center rounded-md border border-slate-200 bg-slate-50">
          <div className="text-center" style={{ transform: `scale(${zoom / 100})` }}>
            <p className="text-sm font-medium text-slate-900">Document Preview Area</p>
            <p className="text-xs text-slate-500">Zoom controls apply to this viewport.</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="warning">Pending Review</Badge>
          <Button>Approve</Button>
          <Button variant="outline">Request Correction</Button>
          <Button variant="outline" className="text-red-700">Reject</Button>
        </div>
      </CardContent>
    </Card>
  );
}
