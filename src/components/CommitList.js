import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

function CommitList({ organizationName, repoName }) {
  const [commits, setCommits] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.github.com/repos/${organizationName}/${repoName}/commits`,
      {
        // where to put the git authentication token
        headers: {},
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const commitsData = data.map((commit) => commit.commit);
        setCommits(commitsData);
      })
      .catch((error) => console.log(error));
  }, [organizationName, repoName]);

  return (
    <div>
      {commits.length > 0 ? (
        <ol>
          {commits.map((commit, index) => (
            <li key={index}>
              <p>Commit message: {commit.message}</p>
              <p>Committer username: {commit.committer.name}</p>
              <p>Commit hash: {commit.tree.sha}</p>
              <p>Date created: {commit.committer.date}</p>
            </li>
          ))}
        </ol>
      ) : (
        <p>No commits found.</p>
      )}
    </div>
  );
}

CommitList.propTypes = {
  organizationName: PropTypes.string,
  repoName: PropTypes.string,
};

export default CommitList;
