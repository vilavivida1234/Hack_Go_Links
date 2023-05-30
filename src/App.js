import { useState } from 'react';
import RepositoryList from "./components/RepositoryList";

function App() {
  const [search, setSearch] = useState("");
  const [organizationName, setOrganizationName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setOrganizationName(search);
  };

  return (
    <div>
      <h1>Search for a GitHub organization</h1>
      <div>
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="githubOrgSearch" hidden>
                Search for GitHub organization
              </label>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                className="form-control"
                id="githubOrgSearch"
                aria-describedby="githubOrgSearch"
                placeholder="Search for a GitHub Organization"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </form>
          <RepositoryList organizationName={organizationName} />
        </div>
      </div>
    </div>
  );
}

export default App;
