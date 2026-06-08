import { useMemo, useState } from "react";
import { ChatInput } from "../../../components/chatbot/ChatInput";
import { ChatMessageList } from "../../../components/chatbot/ChatMessageList";
import { SuggestedPrompts } from "../../../components/chatbot/SuggestedPrompts";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { ErrorState } from "../../../components/common/ErrorState";
import { LoadingState } from "../../../components/common/LoadingState";
import { useChatMessagesQuery, useSendChatMessageMutation } from "../../chatbot/hooks/useChatbotQueries";
import { useChatbotStore } from "../../../store/chatbot.store";

const contextPrompts: Record<string, string[]> = {
  identity: [
    "What identity documents are still missing?",
    "Why was my ID validation flagged?",
    "How long does identity review take?",
  ],
  compliance: [
    "What compliance checks are pending?",
    "Can you summarize AML screening outcome?",
    "How can I reduce review delays?",
  ],
};

export default function EnhancedChatbotPage() {
  const [contextKey, setContextKey] = useState<"identity" | "compliance">("identity");
  const setDraftMessage = useChatbotStore((state) => state.setDraftMessage);
  const suggestions = useChatbotStore((state) => state.suggestions);
  const { data = [], isLoading, isError } = useChatMessagesQuery("client-001", contextKey);
  const sendMutation = useSendChatMessageMutation("client-001", contextKey);

  const promptList = useMemo(() => {
    return suggestions.length > 0 ? suggestions : contextPrompts[contextKey];
  }, [contextKey, suggestions]);

  if (isLoading) return <LoadingState label="Loading chatbot history..." />;
  if (isError) return <ErrorState title="Unable to load chatbot conversations" onRetry={() => window.location.reload()} />;

  return (
    <div className="grid gap-4 xl:grid-cols-3">
      <Card className="xl:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg">Enhanced Chatbot</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <ChatMessageList messages={data} isTyping={sendMutation.isPending} />
          <SuggestedPrompts prompts={promptList} onSelectPrompt={setDraftMessage} />
          <ChatInput
            onSend={(message) => sendMutation.mutate(message)}
            disabled={sendMutation.isPending}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Context-aware assistance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <button
            type="button"
            onClick={() => setContextKey("identity")}
            className={`w-full rounded-md border px-3 py-2 text-left text-sm ${
              contextKey === "identity" ? "border-blue-500 bg-blue-50 text-blue-700" : "border-slate-200"
            }`}
          >
            Identity context
          </button>
          <button
            type="button"
            onClick={() => setContextKey("compliance")}
            className={`w-full rounded-md border px-3 py-2 text-left text-sm ${
              contextKey === "compliance" ? "border-blue-500 bg-blue-50 text-blue-700" : "border-slate-200"
            }`}
          >
            Compliance context
          </button>
          <p className="text-xs text-slate-500">
            Suggestions and responses adapt to the selected onboarding context.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
