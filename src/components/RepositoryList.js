import React, { useEffect, useState } from "react";
import CommitList from "./CommitList";
import Modal from "react-modal";
import PropTypes from "prop-types";

Modal.setAppElement("#root");

function RepositoryList({ organizationName }) {
  const [repositories, setRepositories] = useState([]);
  const [selectedRepository, setSelectedRepository] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    if (organizationName) {
      fetch(`https://api.github.com/orgs/${organizationName}/repos`, {
        // where to put the git authentication token
        headers: {},
      })
        .then((response) => response.json())
        .then((data) => setRepositories(data))
        .catch((error) => console.log(error));
    }
  }, [organizationName]);

  const handleRepositoryClick = (repository) => {
    setSelectedRepository(repository);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedRepository(null);
    setModalIsOpen(false);
  };

  return (
    <div>
      <h1>
        {organizationName
          ? organizationName + " Repositories"
          : "Please input an organization"}
      </h1>
      <ul>
        {repositories && repositories.length > 0 ? (
          repositories.map((repository) => (
            <li key={repository.id}>
              <u onClick={() => handleRepositoryClick(repository)}>
                {repository.name}
              </u>
              <p>Language: {repository.language}</p>
              <p>Description: {repository.description}</p>
              <p>Star count: {repository.stargazers_count}</p>
              <p>Fork count: {repository.forks_count}</p>
              <p>Date created: {repository.created_at}</p>
            </li>
          ))
        ) : (
          <p>No Repository found.</p>
        )}
      </ul>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div style={customStyles.closeButtonWrapper}>
          <button onClick={closeModal} style={closeButtonStyles}>
            X
          </button>
        </div>
        {selectedRepository && (
          <div>
            <h2>Commit History for {selectedRepository.name}</h2>
            <CommitList
              organizationName={organizationName}
              repoName={selectedRepository.name}
            />
          </div>
        )}
      </Modal>
    </div>
  );
}

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "800px",
    height: "500px",
    alignItems: "center",
    justifyContent: "center",
    overflow: "auto",
  },
  closeButtonWrapper: {
    position: "fixed",
    top: "10px",
    right: "10px",
  },
};
const closeButtonStyles = {
  border: "none",
  background: "none",
  fontSize: "24px",
};

RepositoryList.propTypes = {
  organizationName: PropTypes.string,
};

export default RepositoryList;
