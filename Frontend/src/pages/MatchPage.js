import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import Badge from './ui/badge';
import { ArrowLeft, Users, Calendar, MapPin, Award, Briefcase } from 'lucide-react';
import { fetchMatches, seedData } from './api/fetchmatches';
import SchedulePage from './SchedulePage';

const MatchPage = ({ userId, matches: initialMatches, selectedDate }) => {
  const [matches, setMatches] = useState(initialMatches || []);
  const [summary, setSummary] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const getMatches = async () => {
      try {
        await seedData();
        await new Promise(res => setTimeout(res, 300));
        const res = await fetchMatches(userId);
        if (res && res.matches) {
          setMatches(res.matches || []);
          setSummary(res.summary || '');
        } else {
          setMatches([]);
          setSummary('');
        }
      } catch (error) {
        console.error('Error getting matches:', error);
        setMatches([]);
        setSummary('');
      }
    };

    getMatches();
  }, [userId]);

  if (selectedUser) {
    return (
      <SchedulePage
        userId={userId}
        matchedUserId={selectedUser._id}
        matchedUserName={selectedUser.name}
        selectedUser={selectedUser}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-slate-900 dark:to-slate-800 p-4">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          className="mb-6 hover:bg-white/50 dark:hover:bg-slate-800/50"
          onClick={() => window.location.reload()}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Availability
        </Button>

        <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm shadow-xl border-0">
          <CardHeader className="text-center pb-8">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 p-4 text-white mx-auto mb-4">
              <Users className="h-8 w-8" />
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Top Matches
            </CardTitle>
            <p className="text-slate-600 dark:text-slate-300 text-lg">
              Found {matches.length} potential interview partners
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {selectedDate && (
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                <div className="flex items-center text-blue-700 dark:text-blue-300">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span className="font-medium">
                    Selected Time: {selectedDate.toLocaleString()}
                  </span>
                </div>
              </div>
            )}

            {matches.length === 0 ? (
              <div className="text-center py-12">
                <div className="h-16 w-16 rounded-full bg-slate-100 dark:bg-slate-700 p-4 mx-auto mb-4">
                  <Users className="h-8 w-8 text-slate-400" />
                </div>
                <p className="text-xl text-slate-600 dark:text-slate-300">
                  No matches found.
                </p>
                <p className="text-slate-500 dark:text-slate-400 mt-2">
                  Try adjusting your availability or check back later.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {matches.map((m) => (
                  <Card
                    key={m._id}
                    className="group hover:shadow-lg transition-all duration-300 border border-slate-200 dark:border-slate-700 hover:border-emerald-200 dark:hover:border-emerald-700"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                            {m.name}
                          </h3>

                          <div className="flex items-center text-slate-600 dark:text-slate-300 mb-3">
                            <Briefcase className="h-4 w-4 mr-2" />
                            <span className="font-medium">Experience:</span>
                            <span className="ml-2">{m.experience}</span>
                          </div>

                          <div className="flex items-start text-slate-600 dark:text-slate-300 mb-4">
                            <Award className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                            <div>
                              <span className="font-medium">Skills:</span>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {m.skills.map((skill, index) => (
                                  <Badge
                                    key={index}
                                    variant="secondary"
                                    className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-900/50"
                                  >
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Button
                        onClick={() =>
                          setSelectedUser({ ...m, date: selectedDate })
                        }
                        className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        Schedule a Meet
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {summary && (
              <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-800">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-300 mb-3 flex items-center">
                    <Award className="h-5 w-5 mr-2" />
                    AI Summary
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                    {summary}
                  </p>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MatchPage;
