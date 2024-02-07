import React from 'react';

function ActivityIndicator({ activity }) {
  return (
    <div>
      {activity && <p>{activity}</p>}
    </div>
  );
}

export default ActivityIndicator;
