import React, { useState } from "react";
import { Button } from "./ui/button.js";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card.js";
import { Bot, Users } from "lucide-react";
import InterviewHomePage from "./InterviewHomePage";
import AvailabilityForm from "./AvailabilityForm";

const InterviewMain = () => {
  const [page, setPage] = useState("main");

  if (page === "ai") {
    return <InterviewHomePage />;
  }

  if (page === "mentor") {
    return <AvailabilityForm userId="666111111111111111111111" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4">
            Welcome to Interview Platform
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            Choose your preferred interview style
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-blue-200 dark:hover:border-blue-700">
            <CardHeader className="text-center pb-4">
              <div className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900 p-4 mx-auto mb-4 group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
                <Bot className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle className="text-2xl font-semibold text-slate-800 dark:text-white">
                AI Interview
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                Practice with our AI interviewer for instant feedback and flexible scheduling
              </p>
              <Button 
                onClick={() => setPage("ai")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
              >
                Start AI Interview
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-emerald-200 dark:hover:border-emerald-700">
            <CardHeader className="text-center pb-4">
              <div className="h-16 w-16 rounded-full bg-emerald-100 dark:bg-emerald-900 p-4 mx-auto mb-4 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-800 transition-colors">
                <Users className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <CardTitle className="text-2xl font-semibold text-slate-800 dark:text-white">
                Mentor/Peer Interview
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                Connect with experienced professionals for real interview experience
              </p>
              <Button 
                onClick={() => setPage("mentor")}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 text-lg"
              >
                Schedule Interview
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InterviewMain;