import { useState } from 'react';

export default function LeaderBoard({ teams }) {
  console.log("Teams", teams);
  const [membersByTeam, setMembersByTeam] = useState({});
  const [visibleTeams, setVisibleTeams] = useState({});
  const [loading, setLoading] = useState({});
  const [errors, setErrors] = useState({});

  const toggleMembers = async (teamId) => {
    if (visibleTeams[teamId]) {
      // Hide members if already visible
      setVisibleTeams((prev) => ({ ...prev, [teamId]: false }));
      return;
    }

    // If members are already fetched, just show them
    if (membersByTeam[teamId]) {
      setVisibleTeams((prev) => ({ ...prev, [teamId]: true }));
      return;
    }

    // Fetch members from API
    setLoading((prev) => ({ ...prev, [teamId]: true }));
    try {
      const response = await fetch(`http://192.168.12.172:5185/api/Teams/${teamId}`);
      if (!response.ok) throw new Error('Failed to fetch team members');
      const data = await response.json();
      setMembersByTeam((prev) => ({ ...prev, [teamId]: data.members || [] }));
      setVisibleTeams((prev) => ({ ...prev, [teamId]: true }));
      setErrors((prev) => ({ ...prev, [teamId]: null }));
    } catch (error) {
      setErrors((prev) => ({ ...prev, [teamId]: error.message }));
    } finally {
      setLoading((prev) => ({ ...prev, [teamId]: false }));
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Leaderboard</h2>
      <div className="space-y-3">
        {[...teams]
          .sort((a, b) => b.points - a.points)
          .map((t, index) => (
            <div key={t.teamId} className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="flex justify-between items-center p-4 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center space-x-3">
                  <span className="text-lg font-semibold text-gray-600">{index + 1}.</span>
                  <span className="text-lg font-medium text-gray-800">{t.teamName}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-lg font-bold text-blue-600">{t.points} pts</span>
                  <button
                    onClick={() => toggleMembers(t.teamId)}
                    className="px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors duration-150"
                    disabled={loading[t.teamId]}
                  >
                    {loading[t.teamId] ? 'Loading...' : visibleTeams[t.teamId] ? 'Hide Members' : 'Show Members'}
                  </button>
                </div>
              </div>
              
              {visibleTeams[t.teamId] && (
                <div className="px-4 pb-4 pt-2 bg-gray-50 rounded-b-lg transition-all duration-300">
                  {errors[t.teamId] ? (
                    <p className="text-sm text-red-600">Error: {errors[t.teamId]}</p>
                  ) : membersByTeam[t.teamId]?.length > 0 ? (
                    <ul className="list-disc list-inside text-sm text-gray-700">
                      {membersByTeam[t.teamId].map((member) => (
                        <li key={member.userId}>{member.name}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">No members found.</p>
                  )}
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}