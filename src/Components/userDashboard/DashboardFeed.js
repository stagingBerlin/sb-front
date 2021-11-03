import React from "react";

function DashboardFeed() {
  return (
    <div>
      <div className="grid-container-feed">
        <textarea className='post-textarea grid-col-span-5 justify-content-end' rows="4"></textarea>
        <button className="button-grid-2fr grid-col-4">Post</button>
      </div>
    </div>
  );
}

export default DashboardFeed;
