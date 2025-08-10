"use client";

import ActionCard from "@/components/ActionCard";
import { QUICK_ACTIONS } from "@/constants";
import { useUserRole } from "@/hooks/useUserRole";
import { useQuery } from "convex/react";
import { useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import MeetingModal from "@/components/MeetingModal";
import LoaderUI from "@/components/LoaderUI";
import { Loader2Icon, Users } from "lucide-react";
import MeetingCard from "@/components/MeetingCard";

export default function Home() {
  const router = useRouter();

  const { isInterviewer, isCandidate, isLoading } = useUserRole();
  const interviews = useQuery(api.interviews.getMyInterviews);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"start" | "join">();

  const handleQuickAction = (title: string) => {
    switch (title) {
      case "New Call":
        setModalType("start");
        setShowModal(true);
        break;
      case "Join Interview":
        setModalType("join");
        setShowModal(true);
        break;
      default:
        router.push(`/${title.toLowerCase()}`);
    }
  };

  // Quick action for candidates to join meeting
  const candidateJoinAction = {
    icon: Users,
    title: "Join Interview",
    description: "Enter via your meeting link",
    color: "purple-500",
    gradient: "from-purple-500/10 via-purple-500/5 to-transparent",
  };

  if (isLoading) return <LoaderUI />;

  return (
    <div className="container max-w-7xl mx-auto p-6">
      {/* WELCOME SECTION */}
      <div className="rounded-lg bg-card p-6 border shadow-sm mb-10">
        <h1 className="text-4xl font-bold" style={{ color: "purple" }}>
          Let’s get your next conversation started
        </h1>

        <p className="text-muted-foreground mt-2">
          {isInterviewer
            ? "Easily host, manage, and review your interviews in one place"
            : "Join your upcoming interviews and track your preparation progress"}
        </p>
      </div>

      {isInterviewer ? (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {QUICK_ACTIONS.map((action) => (
              <ActionCard
                key={action.title}
                action={action}
                onClick={() => handleQuickAction(action.title)}
              />
            ))}
          </div>

          <MeetingModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            title={modalType === "join" ? "Join a Meeting" : "Start a New Meeting"}
            isJoinMeeting={modalType === "join"}
          />
        </>
      ) : (
        <>
          <div>
            <h1 className="text-3xl font-bold">Your Upcoming Sessions</h1>
            <p className="text-muted-foreground mt-1">
              View details and join your scheduled interviews
            </p>
          </div>

          {/* Add Join Meeting Option for Candidates */}
          <div className="mt-6 mb-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <ActionCard
                action={candidateJoinAction}
                onClick={() => handleQuickAction("Join Interview")}
              />
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Scheduled Meetings</h2>
            {interviews === undefined ? (
              <div className="flex justify-center py-12">
                <Loader2Icon className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : interviews.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {interviews.map((interview) => (
                  <MeetingCard key={interview._id} interview={interview} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                You don’t have any meetings scheduled right now
              </div>
            )}
          </div>

          {/* Meeting Modal for Candidates */}
          <MeetingModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            title="Join a Meeting"
            isJoinMeeting={true}
          />
        </>
      )}
    </div>
  );
}
