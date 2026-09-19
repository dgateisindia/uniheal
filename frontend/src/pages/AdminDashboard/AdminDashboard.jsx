import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedSubmission, setSelectedSubmission] =
    useState(null);

  const [reportLoading, setReportLoading] =
    useState("");

  useEffect(() => {
    const fetchSubmissions = async () => {
      const token = sessionStorage.getItem(
        "uniheal_admin_token"
      );

      if (!token) {
        navigate("/admin/login");
        return;
      }

      try {
        const response = await fetch(
          `${API_URL}/api/admin/submissions`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.status === 401) {
          sessionStorage.removeItem(
            "uniheal_admin_token"
          );

          sessionStorage.removeItem(
            "uniheal_admin"
          );

          navigate("/admin/login");
          return;
        }

        if (!response.ok || !data.success) {
          setError(
            data.message ||
              "Failed to load submissions."
          );
          return;
        }

        setSubmissions(data.submissions || []);
      } catch (error) {
        console.error(
          "Error fetching submissions:",
          error
        );

        setError(
          "Unable to connect to the server."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [navigate]);

  const adminData = JSON.parse(
    sessionStorage.getItem(
      "uniheal_admin"
    ) || "{}"
  );

  const handleLogout = () => {
    sessionStorage.removeItem(
      "uniheal_admin_token"
    );

    sessionStorage.removeItem(
      "uniheal_admin"
    );

    navigate("/admin/login");
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  const getReportFiles = (reports) => {
    if (!reports) return [];

    return reports
      .split(",")
      .map((file) => file.trim())
      .filter(Boolean);
  };

  const getReport = async (
    filename,
    action
  ) => {
    const token = sessionStorage.getItem(
      "uniheal_admin_token"
    );

    if (!token) {
      navigate("/admin/login");
      return;
    }

    try {
      setReportLoading(
        `${action}-${filename}`
      );

      const response = await fetch(
        `${API_URL}/api/admin/reports/${encodeURIComponent(
          filename
        )}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 401) {
        sessionStorage.removeItem(
          "uniheal_admin_token"
        );

        sessionStorage.removeItem(
          "uniheal_admin"
        );

        navigate("/admin/login");
        return;
      }

      if (!response.ok) {
        let message =
          "Unable to open medical report.";

        try {
          const data =
            await response.json();

          if (data.message) {
            message = data.message;
          }
        } catch {
          // Response was not JSON
        }

        alert(message);
        return;
      }

      const blob =
        await response.blob();

      const blobUrl =
        window.URL.createObjectURL(
          blob
        );

      if (action === "view") {
        window.open(
          blobUrl,
          "_blank",
          "noopener,noreferrer"
        );

        setTimeout(() => {
          window.URL.revokeObjectURL(
            blobUrl
          );
        }, 60000);
      }

      if (action === "download") {
        const link =
          document.createElement("a");

        link.href = blobUrl;
        link.download = filename;

        document.body.appendChild(link);

        link.click();

        link.remove();

        setTimeout(() => {
          window.URL.revokeObjectURL(
            blobUrl
          );
        }, 1000);
      }
    } catch (error) {
      console.error(
        "Error accessing medical report:",
        error
      );

      alert(
        "Unable to connect to the server."
      );
    } finally {
      setReportLoading("");
    }
  };

  return (
    <div className="admin-dashboard">

      <header className="admin-dashboard-header">

        <div className="admin-brand">

          <img
            src="/src/assets/images/logo/uniheal-logo.webp"
            alt="UniHeal"
          />

          <div className="admin-brand-text">

            <h1>
              Admin Dashboard
            </h1>

            <span>
              Patient Management Portal
            </span>

          </div>

        </div>

        <div className="admin-header-right">

          <div className="admin-user">

            <div className="admin-user-icon">
              {adminData.name
                ? adminData.name
                    .charAt(0)
                    .toUpperCase()
                : "A"}
            </div>

            <div className="admin-user-details">

              <strong>
                {adminData.name ||
                  "Admin"}
              </strong>

              <span>
                {adminData.email || ""}
              </span>

            </div>

          </div>

          <button
            className="admin-logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </header>

      <main className="admin-dashboard-content">

        <div className="admin-page-heading">

          <div>

            <h2>
              Patient Submissions
            </h2>

            <p>
              View contact form submissions
              received from UniHeal patients.
            </p>

          </div>

          <div className="submission-count">

            <span>
              Total Submissions
            </span>

            <strong>
              {submissions.length}
            </strong>

          </div>

        </div>

        {loading && (

          <div className="admin-status">

            <div className="admin-loader"></div>

            <p>
              Loading submissions...
            </p>

          </div>

        )}

        {!loading && error && (

          <div className="admin-error">
            {error}
          </div>

        )}

        {!loading &&
          !error &&
          submissions.length === 0 && (

            <div className="admin-empty">

              <div className="admin-empty-icon">
                📋
              </div>

              <h3>
                No submissions yet
              </h3>

              <p>
                Patient contact form
                submissions will appear here.
              </p>

            </div>

          )}

        {!loading &&
          !error &&
          submissions.length > 0 && (

            <div className="admin-table-wrapper">

              <table className="admin-submissions-table">

                <thead>

                  <tr>

                    <th>ID</th>

                    <th>
                      Patient
                    </th>

                    <th>
                      Contact
                    </th>

                    <th>
                      Country
                    </th>

                    <th>
                      Treatment
                    </th>

                    <th>
                      Medical Reports
                    </th>

                    <th>
                      Submitted
                    </th>

                    <th>
                      Details
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {submissions.map(
                    (submission) => {

                      const reportFiles =
                        getReportFiles(
                          submission.medical_reports
                        );

                      return (

                        <tr
                          key={
                            submission.id
                          }
                        >

                          {/* ID */}

                          <td>

                            <span className="submission-id">
                              #{submission.id}
                            </span>

                          </td>

                          {/* PATIENT */}

                          <td>

                            <div className="patient-cell">

                              <strong>
                                {submission.name}
                              </strong>

                              <span>
                                {submission.email}
                              </span>

                            </div>

                          </td>

                          {/* CONTACT */}

                          <td>
                            {submission.contact}
                          </td>

                          {/* COUNTRY */}

                          <td>
                            {submission.country}
                          </td>

                          {/* TREATMENT */}

                          <td>

                            <span className="treatment-badge">
                              {
                                submission.treatment
                              }
                            </span>

                          </td>

                          {/* MEDICAL REPORTS */}

                          <td>

                            {reportFiles.length >
                            0 ? (

                              <div className="report-actions">

                                <span className="report-count">
                                  📎{" "}
                                  {reportFiles.length}{" "}
                                  file
                                  {reportFiles.length > 1
                                    ? "s"
                                    : ""}
                                </span>

                              </div>

                            ) : (

                              <span className="no-report">
                                No files
                              </span>

                            )}

                          </td>

                          <td className="date-cell">

                            {formatDate(
                              submission.created_at
                            )}

                          </td>

                          <td>

                            <button
                              type="button"
                              className="view-details-button"
                              onClick={() =>
                                setSelectedSubmission(
                                  submission
                                )
                              }
                            >
                              View
                            </button>

                          </td>

                        </tr>

                      );
                    }
                  )}

                </tbody>

              </table>

            </div>

          )}

        {!loading &&
          !error &&
          submissions.length > 0 && (

            <div className="admin-mobile-cards">

              {submissions.map(
                (submission) => {

                  const reportFiles =
                    getReportFiles(
                      submission.medical_reports
                    );

                  return (

                    <div
                      className="admin-patient-card"
                      key={
                        submission.id
                      }
                    >

                      <div className="patient-card-top">

                        <div>

                          <span className="patient-card-id">
                            #{submission.id}
                          </span>

                          <h3>
                            {submission.name}
                          </h3>

                        </div>

                        <span className="mobile-treatment">
                          {
                            submission.treatment
                          }
                        </span>

                      </div>

                      <div className="patient-card-info">

                        <div>

                          <span>
                            Email
                          </span>

                          <strong>
                            {submission.email}
                          </strong>

                        </div>

                        <div>

                          <span>
                            Contact
                          </span>

                          <strong>
                            {submission.contact}
                          </strong>

                        </div>

                        <div>

                          <span>
                            Country
                          </span>

                          <strong>
                            {submission.country}
                          </strong>

                        </div>

                        <div>

                          <span>
                            Reports
                          </span>

                          <strong>
                            {reportFiles.length >
                            0
                              ? `${reportFiles.length} file${
                                  reportFiles.length >
                                  1
                                    ? "s"
                                    : ""
                                }`
                              : "No files"}
                          </strong>

                        </div>

                        <div>

                          <span>
                            Submitted
                          </span>

                          <strong>
                            {formatDate(
                              submission.created_at
                            )}
                          </strong>

                        </div>

                      </div>

                      {/* MOBILE REPORT BUTTONS */}

                      {reportFiles.length >
                        0 && (

                        <div className="mobile-report-actions">

                          {reportFiles.map(
                            (
                              file,
                              index
                            ) => (

                              <button
                                key={file}
                                type="button"
                                className="mobile-report-button"
                                onClick={() =>
                                  getReport(
                                    file,
                                    "view"
                                  )
                                }
                                disabled={
                                  reportLoading ===
                                  `view-${file}`
                                }
                              >

                                {reportLoading ===
                                `view-${file}`
                                  ? "Opening..."
                                  : `📄 View Report ${
                                      index +
                                      1
                                    }`}

                              </button>

                            )
                          )}

                        </div>

                      )}

                      <button
                        type="button"
                        className="mobile-view-button"
                        onClick={() =>
                          setSelectedSubmission(
                            submission
                          )
                        }
                      >
                        View Patient Details
                      </button>

                    </div>

                  );
                }
              )}

            </div>

          )}

      </main>

      {selectedSubmission && (

        <div
          className="admin-modal-overlay"
          onClick={() =>
            setSelectedSubmission(
              null
            )
          }
        >

          <div
            className="admin-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="admin-modal-header">

              <div>

                <span>
                  Submission #
                  {
                    selectedSubmission.id
                  }
                </span>

                <h2>
                  {
                    selectedSubmission.name
                  }
                </h2>

              </div>

              <button
                type="button"
                className="admin-modal-close"
                onClick={() =>
                  setSelectedSubmission(
                    null
                  )
                }
              >
                ×
              </button>

            </div>

            <div className="admin-modal-body">

              {/* PATIENT INFORMATION */}

              <div className="detail-section">

                <h3>
                  Patient Information
                </h3>

                <div className="detail-grid">

                  <div>

                    <span>
                      Name
                    </span>

                    <strong>
                      {
                        selectedSubmission.name
                      }
                    </strong>

                  </div>

                  <div>

                    <span>
                      Email
                    </span>

                    <strong>
                      {
                        selectedSubmission.email
                      }
                    </strong>

                  </div>

                  <div>

                    <span>
                      Contact
                    </span>

                    <strong>
                      {
                        selectedSubmission.contact
                      }
                    </strong>

                  </div>

                  <div>

                    <span>
                      Country
                    </span>

                    <strong>
                      {
                        selectedSubmission.country
                      }
                    </strong>

                  </div>

                  <div>

                    <span>
                      Treatment
                    </span>

                    <strong>
                      {
                        selectedSubmission.treatment
                      }
                    </strong>

                  </div>

                  <div>

                    <span>
                      Submitted
                    </span>

                    <strong>
                      {formatDate(
                        selectedSubmission.created_at
                      )}
                    </strong>

                  </div>

                </div>

              </div>

              {/* MEDICAL HISTORY */}

              <div className="detail-section">

                <h3>
                  Medical History
                </h3>

                <p className="medical-history">

                  {
                    selectedSubmission.medical_history ||
                    "No medical history provided."
                  }

                </p>

              </div>

              {/* MEDICAL REPORTS */}

              <div className="detail-section">

                <h3>
                  Medical Reports
                </h3>

                {getReportFiles(
                  selectedSubmission.medical_reports
                ).length > 0 ? (

                  <div className="report-list">

                    {getReportFiles(
                      selectedSubmission.medical_reports
                    ).map(
                      (file, index) => (

                        <div
                          className="report-item"
                          key={file}
                        >

                          <div className="report-file-info">

                            <span>
                              📄 Report{" "}
                            </span>

                            <span className="report-filename">
                              {file}
                            </span>

                          </div>

                          <div className="report-file-actions">

                            <button
                              type="button"
                              className="report-action-button"
                              onClick={() =>
                                getReport(
                                  file,
                                  "view"
                                )
                              }
                              disabled={
                                reportLoading ===
                                `view-${file}`
                              }
                            >

                              {reportLoading ===
                              `view-${file}`
                                ? "Opening..."
                                : "View"}

                            </button>

                            <button
                              type="button"
                              className="report-action-button download"
                              onClick={() =>
                                getReport(
                                  file,
                                  "download"
                                )
                              }
                              disabled={
                                reportLoading ===
                                `download-${file}`
                              }
                            >

                              {reportLoading ===
                              `download-${file}`
                                ? "Downloading..."
                                : "Download"}

                            </button>

                          </div>

                        </div>

                      )
                    )}

                  </div>

                ) : (

                  <p className="no-reports-text">
                    No medical reports uploaded.
                  </p>

                )}

              </div>

            </div>

            <div className="admin-modal-footer">

              <button
                type="button"
                className="modal-close-button"
                onClick={() =>
                  setSelectedSubmission(
                    null
                  )
                }
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default AdminDashboard;