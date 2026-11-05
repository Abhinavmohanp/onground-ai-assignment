import { useState } from "react";
import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [expandedLead, setExpandedLead] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCall, setActiveCall] = useState(null);
  const [callHistory, setCallHistory] = useState([]);

  // PULSE CHAT STATE
  const [pulseMessage, setPulseMessage] = useState("");
  const [pulseMessages, setPulseMessages] = useState([
    {
      id: 1,
      sender: "Team Lead",
      message: "Great work on today's customer callbacks!",
    },
    {
      id: 2,
      sender: "Ananya",
      message: "Remember to follow up with high-value leads.",
    },
    {
      id: 3,
      sender: "You",
      message: "Working on my scheduled callbacks.",
    },
  ]);

  // NEEDS YOUR INPUT STATE
  const [inputResponse, setInputResponse] = useState("");
  const [inputCompleted, setInputCompleted] = useState(false);

  // CALENDAR EVENTS
  const [calendarEvents, setCalendarEvents] = useState([
    {
      id: 1,
      day: "Monday",
      time: "10:00 AM",
      name: "Ritu S.",
      phone: "9876543210",
    },
    {
      id: 2,
      day: "Wednesday",
      time: "2:30 PM",
      name: "Mukunda",
      phone: "9876543211",
    },
    {
      id: 3,
      day: "Today",
      time: "4:30 PM",
      name: "Divya",
      phone: "9876543212",
    },
    {
      id: 4,
      day: "Friday",
      time: "11:00 AM",
      name: "Priya Sharma",
      phone: "9876543213",
    },
  ]);

  // SIDEBAR NAVIGATION
  const navigation = [
    { name: "Dashboard", icon: "▦" },
    { name: "Plan", icon: "☎" },
    { name: "Calls to make", icon: "↗" },
    { name: "Incoming", icon: "↙" },
    { name: "Recent", icon: "◷" },
    { name: "Practise a call", icon: "☏" },
    { name: "Calendar", icon: "▣" },
    { name: "Pulse", icon: "▤" },
  ];

  // DASHBOARD STATISTICS
  const stats = [
    { title: "OG SCORE", value: "76", change: "▲ 13" },
    { title: "AVG HANDLE TIME", value: "4m 12s", change: "▼ 8%" },
    { title: "CSAT", value: "94%", change: "▲ 2pt" },
    { title: "IN QUEUE", value: "2", change: "● Live" },
  ];

  // CUSTOMER LEADS
  const leads = [
    {
      id: 1,
      name: "Ritu S.",
      product: "Smart Luxe Mattress",
      price: "₹13,390",
      score: 96,
      phone: "9876543210",
      interest: "High",
      notes: "Visited RT Nagar store and tried Smart Luxe.",
    },
    {
      id: 2,
      name: "Mukunda",
      product: "Ortho GRID",
      price: "₹8,490",
      score: 90,
      phone: "9876543211",
      interest: "High",
      notes: "Interested in purchasing Ortho GRID.",
    },
    {
      id: 3,
      name: "Divya",
      product: "Mattress",
      price: "₹12,000",
      score: 38,
      phone: "9876543212",
      interest: "Medium",
      notes: "Needs a follow-up call.",
    },
  ];

  // INCOMING MISSED CALLS
  const incomingCalls = [
    {
      id: 1,
      name: "Ritu S.",
      phone: "9876543210",
      product: "Smart Luxe Mattress",
      expectedValue: 13390,
      missedAt: "Today, 11:20 AM",
      score: 96,
    },
    {
      id: 2,
      name: "Mukunda",
      phone: "9876543211",
      product: "Ortho GRID",
      expectedValue: 8490,
      missedAt: "Today, 10:45 AM",
      score: 90,
    },
    {
      id: 3,
      name: "Divya",
      phone: "9876543212",
      product: "Mattress",
      expectedValue: 12000,
      missedAt: "Yesterday, 2:15 PM",
      score: 38,
    },
  ].sort((a, b) => b.expectedValue - a.expectedValue);

  // PAGINATION
  const leadsPerPage = 2;
  const totalPages = Math.ceil(leads.length / leadsPerPage);

  const displayedLeads = leads.slice(
    (currentPage - 1) * leadsPerPage,
    currentPage * leadsPerPage,
  );

  // SELECTED LEAD FOR MODAL
  const selectedLead = leads.find((lead) => lead.id === expandedLead);

  const openLead = (lead) => {
    setExpandedLead(lead.id);
  };

  const moveLeadModal = (direction) => {
    if (!selectedLead) return;

    const index = leads.findIndex((lead) => lead.id === selectedLead.id);

    const nextIndex = Math.min(
      Math.max(index + direction, 0),
      leads.length - 1,
    );

    setExpandedLead(leads[nextIndex].id);
  };

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Today"];

  // START CALL
  const startCall = (person) => {
    setActiveCall(person);
  };

  // FINISH CALL
  const finishCall = (outcome) => {
    if (!activeCall) return;

    const record = {
      id: Date.now(),
      name: activeCall.name,
      phone: activeCall.phone,
      outcome,
      date: new Date().toLocaleString(),
    };

    setCallHistory((previous) => [record, ...previous]);
    setActiveCall(null);
  };

  // SEND PULSE MESSAGE
  const sendPulseMessage = (event) => {
    event.preventDefault();

    const trimmedMessage = pulseMessage.trim();
    if (!trimmedMessage) return;

    setPulseMessages((previous) => [
      ...previous,
      {
        id: Date.now(),
        sender: "You",
        message: trimmedMessage,
      },
    ]);

    setPulseMessage("");
  };

  // SUBMIT RESPONSE TO TEAM LEAD
  const submitInputResponse = (event) => {
    event.preventDefault();

    if (!inputResponse.trim()) return;

    setInputCompleted(true);

    setPulseMessages((previous) => [
      ...previous,
      {
        id: Date.now(),
        sender: "You",
        message: `Response to Team Lead: ${inputResponse.trim()}`,
      },
    ]);

    setInputResponse("");
  };

  // NAVIGATION
  const handleNavigation = (page) => {
    setActivePage(page);
    setCurrentPage(1);
    setExpandedLead(null);
  };

  // PAGINATION HANDLERS
  const handlePrevious = () => {
    setCurrentPage((page) => Math.max(page - 1, 1));
    setExpandedLead(null);
  };

  const handleNext = () => {
    setCurrentPage((page) => Math.min(page + 1, totalPages));
    setExpandedLead(null);
  };

  const totalExpectedValue = incomingCalls.reduce(
    (total, call) => total + call.expectedValue,
    0,
  );

  return (
    <div className="app-container">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2 className="brand">On-Ground.ai</h2>

        <nav>
          {navigation.map((item) => (
            <button
              key={item.name}
              className={`nav-item ${activePage === item.name ? "active" : ""}`}
              onClick={() => handleNavigation(item.name)}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.name}
            </button>
          ))}
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        {/* HEADER */}
        <header className="top-header">
          <div className="company-name">
            <span className="logo">OG</span>
            <h3>On-Ground.ai</h3>
          </div>

          <div className="header-actions">
            <span className="notification">🔔</span>
            <span className="score">76 ⭐ #3</span>
            <span className="profile">AR</span>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <section className="page-content">
          {/* DASHBOARD */}
          {activePage === "Dashboard" ? (
            <>
              <h2 className="page-title">The Sleep Company - Call Centre</h2>

              <div className="stats-grid">
                {stats.map((stat) => (
                  <div className="stat-card" key={stat.title}>
                    <h2>{stat.value}</h2>
                    <p>{stat.title}</p>
                    <span>{stat.change}</span>
                  </div>
                ))}
              </div>

              <div className="dashboard-grid">
                <div className="progress-card">
                  <h3>MY PROGRESS - TODAY</h3>

                  <div className="progress-items">
                    <div>
                      <h2>3</h2>
                      <p>Leads Created</p>
                    </div>

                    <div>
                      <h2>2</h2>
                      <p>Leads Called</p>
                    </div>
                  </div>
                </div>

                <div className="earnings-card">
                  <h3>💰 My earnings this month</h3>
                  <h1>₹5,200</h1>
                  <p>₹21,700 from coached moves</p>

                  <div className="progress-bar">
                    <div></div>
                  </div>
                </div>

                <div className="waiting-card">
                  <h3>WHO'S WAITING</h3>

                  <div className="customer">
                    <strong>Priya Iyer</strong>
                    <span>4m 20s</span>
                    <p>Likely billing dispute — flagged before</p>
                  </div>

                  <div className="customer">
                    <strong>Suresh Nair</strong>
                    <span>1m 50s</span>
                    <p>Plan upgrade enquiry</p>
                  </div>
                </div>

                <div className="tasks-card">
                  <h3>MY TASKS 🔴 3</h3>
                  <div className="task">☎ 2 callbacks next 4:30pm</div>
                  <div className="task">👥 2 hot leads untouched 24h</div>
                  <div className="task">📋 1 outcome to log</div>
                </div>
              </div>

              {/* CALLS CHART */}
              <div className="chart-card">
                <h3>CALLS HANDLED - LAST 7 DAYS</h3>

                <div className="bars">
                  {[18, 22, 15, 26, 20, 12, 14].map((value, index) => (
                    <div className="bar-column" key={index}>
                      <span>{value}</span>

                      <div
                        className="bar"
                        style={{ height: `${value * 3}px` }}
                      ></div>

                      <small>{days[index]}</small>
                    </div>
                  ))}
                </div>
              </div>

              {/* CSAT CHART */}
              <div className="chart-card">
                <h3>CSAT TREND - LAST 7 DAYS</h3>

                <div className="bars csat-bars">
                  {[88, 90, 85, 92, 89, 91, 94].map((value, index) => (
                    <div className="bar-column" key={index}>
                      <span>{value}%</span>

                      <div
                        className="bar"
                        style={{ height: `${value * 1.2}px` }}
                      ></div>

                      <small>{days[index]}</small>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : activePage === "Plan" ? (
            <div className="plan-page">
              <h2>Calling Plan</h2>

              <p className="page-subtitle">
                Manage your customer conversations and follow-ups.
              </p>

              <div className="plan-cards">
                <div className="plan-card">
                  <h3>↗ Calls to make</h3>
                  <p>Customers waiting for an outgoing call.</p>
                  <button onClick={() => setActivePage("Calls to make")}>
                    View calls
                  </button>
                </div>

                <div className="plan-card">
                  <h3>↙ Incoming</h3>
                  <p>Missed calls that need a callback.</p>
                  <button onClick={() => setActivePage("Incoming")}>
                    View callbacks
                  </button>
                </div>

                <div className="plan-card">
                  <h3>◷ Recent</h3>
                  <p>Review your previous call activity.</p>
                  <button onClick={() => setActivePage("Recent")}>
                    View history
                  </button>
                </div>
              </div>
            </div>
          ) : activePage === "Calls to make" ? (
            <div className="calls-page">
              <h2>Today's Calling Plan</h2>
              <p>Planned outgoing calls</p>

              <div className="leads-list">
                {displayedLeads.map((lead) => (
                  <div className="lead-card" key={lead.id}>
                    <h3>{lead.name}</h3>

                    <p>
                      Interested: {lead.product} · {lead.price}
                    </p>

                    <p>Score: {lead.score}</p>
                    <p>Phone: {lead.phone}</p>
                    <p>Interest: {lead.interest}</p>

                    <button onClick={() => openLead(lead)}>View details</button>

                    <button onClick={() => startCall(lead)}>
                      ☎ Place call
                    </button>
                  </div>
                ))}
              </div>

              <div className="pagination">
                <button onClick={handlePrevious} disabled={currentPage === 1}>
                  ← Previous
                </button>

                <span>
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                >
                  Next →
                </button>
              </div>
            </div>
          ) : activePage === "Incoming" ? (
            <div className="incoming-page">
              <h2>Missed calls</h2>

              <p className="incoming-subtitle">
                Ranked by expected value — call the highest-value leads back
                first
              </p>

              <div className="incoming-summary">
                <div>
                  <h2>{incomingCalls.length}</h2>
                  <p>Missed calls</p>
                </div>

                <div className="incoming-summary-divider"></div>

                <div>
                  <h2>₹{totalExpectedValue.toLocaleString("en-IN")}</h2>
                  <p>Expected value at stake</p>
                </div>
              </div>

              <div className="incoming-list">
                {incomingCalls.map((call) => (
                  <div className="incoming-card" key={call.id}>
                    <div className="incoming-person">
                      <div className="missed-call-icon">☎</div>

                      <div>
                        <h3>{call.name}</h3>
                        <p>{call.phone}</p>
                        <p>Missed: {call.missedAt}</p>
                      </div>
                    </div>

                    <div className="incoming-details">
                      <p>
                        <strong>{call.product}</strong>
                      </p>

                      <p>Lead score: {call.score}</p>

                      <p className="expected-value">
                        ₹{call.expectedValue.toLocaleString("en-IN")} expected
                      </p>

                      <button onClick={() => startCall(call)}>
                        ☎ Call back
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : activePage === "Recent" ? (
            <div className="placeholder-page">
              <h2>Recent Calls</h2>

              {callHistory.length === 0 ? (
                <p>
                  No calls recorded yet. Start a call from Calls to make or
                  Incoming.
                </p>
              ) : (
                callHistory.map((record) => (
                  <div className="customer" key={record.id}>
                    <strong>{record.name}</strong>
                    <p>{record.phone}</p>
                    <p>Outcome: {record.outcome}</p>
                    <p>{record.date}</p>
                  </div>
                ))
              )}
            </div>
          ) : activePage === "Practise a call" ? (
            <div className="practice-page">
              <h2>Practise a call</h2>
              <p>Improve your customer conversation skills.</p>

              <div className="practice-card">
                <h3>Customer scenario</h3>
                <h2>Priya Sharma</h2>

                <p>Product: Smart Luxe Mattress</p>
                <p>Budget: ₹15,000</p>

                <p>
                  Customer requirement: Looking for a comfortable mattress with
                  good back support.
                </p>

                <h3>Suggested opening</h3>

                <p>
                  Hello Priya! Thank you for your interest in The Sleep Company.
                  How can I help you today?
                </p>

                <h3>Practice checklist</h3>

                <ul>
                  <li>Greet the customer politely</li>
                  <li>Understand customer requirements</li>
                  <li>Explain product benefits</li>
                  <li>Handle customer objections</li>
                  <li>Close the conversation politely</li>
                </ul>

                <button
                  onClick={() =>
                    startCall({
                      name: "Priya Sharma",
                      phone: "Practice session",
                      product: "Smart Luxe Mattress",
                    })
                  }
                >
                  Start practice
                </button>
              </div>
            </div>
          ) : activePage === "Calendar" ? (
            <div className="calendar-page">
              <h2>Callback Calendar</h2>
              <p>Manage your scheduled customer callbacks.</p>

              <div className="calendar-toolbar">
                <span>Weekly schedule</span>

                <button
                  onClick={() =>
                    setCalendarEvents((previous) => [
                      ...previous,
                      {
                        id: Date.now(),
                        day: "Today",
                        time: "5:00 PM",
                        name: "New callback",
                        phone: "Add customer details",
                      },
                    ])
                  }
                >
                  + Add callback
                </button>
              </div>

              <div className="calendar-grid">
                {[
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Today",
                ].map((day) => (
                  <div className="calendar-day" key={day}>
                    <h3>{day}</h3>

                    {calendarEvents
                      .filter((event) => event.day === day)
                      .map((event) => (
                        <div className="calendar-event" key={event.id}>
                          <strong>{event.time}</strong>
                          <p>{event.name}</p>
                          <small>{event.phone}</small>

                          <button onClick={() => startCall(event)}>
                            Call customer
                          </button>
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            </div>
          ) : activePage === "Pulse" ? (
            <div className="pulse-page">
              <h2>Team Pulse</h2>

              <p className="pulse-subtitle">
                Your performance, coaching insights and team conversations.
              </p>

              <div className="pulse-stats">
                <div className="pulse-stat-card">
                  <p>OG PERFORMANCE SCORE</p>
                  <h3>76 / 100</h3>
                </div>

                <div className="pulse-stat-card">
                  <p>CALLS HANDLED TODAY</p>
                  <h3>{callHistory.length + 12}</h3>
                </div>

                <div className="pulse-stat-card">
                  <p>CUSTOMER SATISFACTION</p>
                  <h3>94%</h3>
                </div>

                <div className="pulse-stat-card">
                  <p>AVERAGE HANDLE TIME</p>
                  <h3>4m 12s</h3>
                </div>
              </div>

              <div className="pulse-content">
                {/* NEEDS YOUR INPUT */}
                <div className="pulse-panel needs-input-panel">
                  <h3>Needs your input</h3>

                  {inputCompleted ? (
                    <div className="input-completed">
                      <strong>✓ Response submitted</strong>
                      <p>Your response has been shared with the team.</p>
                    </div>
                  ) : (
                    <div className="input-request">
                      <span className="pending-label">Pending response</span>

                      <h4>Team Lead</h4>

                      <p>
                        Please confirm which high-value customer callback you
                        will prioritise today.
                      </p>

                      <form onSubmit={submitInputResponse}>
                        <textarea
                          value={inputResponse}
                          onChange={(event) =>
                            setInputResponse(event.target.value)
                          }
                          placeholder="Type your response..."
                          rows="3"
                          required
                        />

                        <button type="submit">Submit response</button>
                      </form>
                    </div>
                  )}
                </div>

                <div className="pulse-panel">
                  <h3>Performance insights</h3>

                  <div className="pulse-insight">
                    <strong>Strong customer satisfaction</strong>
                    <p>
                      Your current CSAT score is 94%. Keep using clear and
                      friendly communication.
                    </p>
                  </div>

                  <div className="pulse-insight">
                    <strong>Prioritise high-value callbacks</strong>
                    <p>
                      Follow up with leads that have a high expected value and
                      lead score.
                    </p>
                  </div>

                  <div className="pulse-insight">
                    <strong>Improve call consistency</strong>
                    <p>
                      Use the practice checklist to make sure each customer
                      receives a complete conversation.
                    </p>
                  </div>
                </div>

                <div className="pulse-panel">
                  <h3>Team updates</h3>

                  <div className="pulse-insight">
                    <strong>Team Lead</strong>
                    <p>
                      Today's focus: resolve pending callbacks and update every
                      call outcome.
                    </p>
                  </div>

                  <div className="pulse-insight">
                    <strong>Daily reminder</strong>
                    <p>Keep customer notes updated after each conversation.</p>
                  </div>
                </div>

                <div className="pulse-panel pulse-chat">
                  <h3># general — Team channel</h3>

                  <div className="pulse-messages">
                    {pulseMessages.map((item) => (
                      <div className="pulse-message" key={item.id}>
                        <strong>{item.sender}</strong>
                        <p>{item.message}</p>
                      </div>
                    ))}
                  </div>

                  <form className="pulse-chat-form" onSubmit={sendPulseMessage}>
                    <input
                      type="text"
                      value={pulseMessage}
                      onChange={(event) => setPulseMessage(event.target.value)}
                      placeholder="Write a message to the team..."
                      aria-label="Team message"
                    />

                    <button type="submit">Send</button>
                  </form>
                </div>
              </div>
            </div>
          ) : (
            <div className="placeholder-page">
              <h2>{activePage}</h2>
              <p>This section will be developed next.</p>

              <button onClick={() => handleNavigation("Dashboard")}>
                Back to Dashboard
              </button>
            </div>
          )}
        </section>
      </main>

      {/* LEAD DETAILS MODAL */}
      {selectedLead && (
        <div
          className="lead-modal-overlay"
          onClick={() => setExpandedLead(null)}
        >
          <section
            className="lead-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="lead-modal-close"
              onClick={() => setExpandedLead(null)}
              aria-label="Close"
            >
              ×
            </button>

            <p className="lead-modal-eyebrow">LEAD DETAILS</p>
            <h2 id="lead-modal-title">{selectedLead.name}</h2>

            <p className="lead-modal-product">
              {selectedLead.product} · {selectedLead.price}
            </p>

            <div className="lead-modal-grid">
              <div>
                <span>Phone</span>
                <strong>{selectedLead.phone}</strong>
              </div>

              <div>
                <span>Lead score</span>
                <strong>{selectedLead.score}/100</strong>
              </div>

              <div>
                <span>Interest</span>
                <strong>{selectedLead.interest}</strong>
              </div>

              <div>
                <span>Expected value</span>
                <strong>{selectedLead.price}</strong>
              </div>
            </div>

            <div className="lead-modal-notes">
              <strong>Customer notes</strong>
              <p>{selectedLead.notes}</p>
            </div>

            <div className="lead-modal-actions">
              <button
                className="secondary-action"
                onClick={() => moveLeadModal(-1)}
                disabled={
                  leads.findIndex((lead) => lead.id === selectedLead.id) === 0
                }
              >
                ← Previous lead
              </button>

              <button
                className="primary-action"
                onClick={() => {
                  setExpandedLead(null);
                  startCall(selectedLead);
                }}
              >
                ☎ Call lead
              </button>

              <button
                className="secondary-action"
                onClick={() => moveLeadModal(1)}
                disabled={
                  leads.findIndex((lead) => lead.id === selectedLead.id) ===
                  leads.length - 1
                }
              >
                Next lead →
              </button>
            </div>
          </section>
        </div>
      )}

      {/* CALL POPUP */}
      {activeCall && (
        <div className="call-overlay">
          <div className="call-modal">
            <h2>Call Details</h2>

            <h3>{activeCall.name}</h3>
            <p>{activeCall.phone}</p>

            {activeCall.phone !== "Practice session" && (
              <a className="dial-call-button" href={`tel:${activeCall.phone}`}>
                ☎ Open phone dialer
              </a>
            )}

            <div className="calling-status">📞 Ready to place call</div>

            <h4>End call and select outcome</h4>

            <button onClick={() => finishCall("Interested")}>Interested</button>

            <button onClick={() => finishCall("Not Interested")}>
              Not Interested
            </button>

            <button onClick={() => finishCall("No Answer")}>No Answer</button>

            <button onClick={() => finishCall("Call Back Later")}>
              Call Back Later
            </button>

            <button className="cancel-call" onClick={() => setActiveCall(null)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
