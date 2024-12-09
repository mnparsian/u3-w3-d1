import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Job from "./Job";
import { useSelector } from "react-redux";

const FavoriteCompanies = () => {
  const companies = useSelector((state) => state.companies);
  console.log("Companies from Redux state:", companies);

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const baseEndpoint = "https://strive-benchmark.herokuapp.com/api/jobs?company=";

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        console.log("Companies to fetch:", companies);
        const jobRequests = companies.map((company) => fetch(baseEndpoint + company).then((response) => response.json()));
        const results = await Promise.all(jobRequests);
        console.log("API results:", results);
        const jobsData = results.flatMap((result) => result.data || []);
        console.log("Flattened jobs:", jobsData);
        setJobs(jobsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setLoading(false);
      }
    };

    if (companies.length > 0) {
      fetchJobs();
    } else {
      setLoading(false);
    }
  }, [companies]);

  return (
    <Container>
      <Row>
        <Col className="my-3">
          <h1 className="display-4">Favorite Companies</h1>
          {loading ? (
            <p>Loading jobs...</p>
          ) : jobs.length > 0 ? (
            jobs.map((jobData) => <Job key={jobData._id} data={jobData} />)
          ) : (
            <p>No jobs found for favorite companies.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default FavoriteCompanies;
