import React, { useState } from 'react';
import { Button } from './ui/button'; // Adjust path as needed
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from './ui/card'; // Adjust path as needed
import { ArrowLeft, Users, Calendar, Loader2 } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import MatchPage from './MatchPage';
import { fetchMatches } from './api/fetchmatches';

const AvailabilityForm = ({ userId }) => {
  const [date, setDate] = useState(null);
  const [matches, setMatches] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await fetchMatches(userId);
      setMatches(data.matches);
    } catch (err) {
      console.error('Frontend error ➜', err);
      setError('An error occurred. Please try again.');
    }
    setLoading(false);
  };

  if (matches) {
    return <MatchPage userId={userId} matches={matches} selectedDate={date} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-slate-900 dark:to-slate-800 p-4">
      <div className="max-w-2xl mx-auto">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => window.location.reload()}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Selection
        </Button>

        <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-xl">
          <CardHeader className="text-center pb-6">
            <div className="h-16 w-16 rounded-full bg-emerald-100 dark:bg-emerald-900 p-4 mx-auto mb-4">
              <Users className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <CardTitle className="text-3xl font-bold text-slate-800 dark:text-white">
              Schedule with Mentor/Peer
            </CardTitle>
            <p className="text-slate-600 dark:text-slate-300">
              Select your availability for interview matching
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={submit} className="space-y-6">
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <p className="text-red-600 dark:text-red-400 text-center">
                    {error}
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  <Calendar className="h-4 w-4 inline mr-2" />
                  Select Date & Time
                </label>
                <div className="w-full">
                  <DatePicker
                    selected={date}
                    onChange={(d) => setDate(d)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    dateFormat="MMMM d, yyyy h:mm aa"
                    placeholderText="Pick a meeting time"
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    minDate={new Date()}
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={!date || loading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white py-3 text-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Scheduling...
                  </>
                ) : (
                  'Find Match & Schedule'
                )}
              </Button>

              {/* <div className="text-center text-sm text-slate-500 dark:text-slate-400">
                User ID:{' '}
                <code className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">
                  {userId}
                </code>
              </div> */}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AvailabilityForm;
