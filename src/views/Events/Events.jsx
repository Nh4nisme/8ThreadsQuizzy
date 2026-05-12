"use client";

import { useState, useEffect, useMemo } from "react";
import EventItem from "./components/EventItem.jsx";
import ScheduleEventModal from "./components/ScheduleEventModal.jsx";
import { fetchTeacherEvents, createEventRequest, updateEventRequest, updateEventStatusRequest, deleteEventRequest } from "../../lib/quiz-client.js";
import { Search, Plus, Calendar, Filter } from "lucide-react";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All Events");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const loadEvents = async () => {
    setIsLoading(true);
    try {
      const data = await fetchTeacherEvents();
      setEvents(data.events || []);
    } catch (error) {
      console.error("Failed to load events:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const filteredEvents = useMemo(() => {
    return events
      .filter((event) => {
        const status = event.currentStatus;
        if (activeTab === "All Events") return true;
        return status.toLowerCase() === activeTab.toLowerCase();
      })
      .filter((event) =>
        `${event.title} ${event.description}`
          .toLowerCase()
          .includes(search.toLowerCase())
      );
  }, [events, activeTab, search]);

  const handleScheduleEvent = async (formData) => {
    try {
      if (editingEvent) {
        await updateEventRequest(editingEvent._id, formData);
      } else {
        await createEventRequest(formData);
      }
      setIsModalOpen(false);
      setEditingEvent(null);
      loadEvents();
    } catch (error) {
      alert("Failed to save event: " + error.message);
    }
  };

  const handleEditClick = (event) => {
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  const handleStatusUpdate = async (eventId, newStatus) => {
    try {
      await updateEventStatusRequest(eventId, newStatus);
      loadEvents();
    } catch (error) {
      alert("Failed to update status: " + error.message);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await deleteEventRequest(eventId);
        loadEvents();
      } catch (error) {
        alert("Failed to delete event: " + error.message);
      }
    }
  };

  return (
    <div className="text-white min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent flex items-center gap-2">
            Quiz Events
          </h1>
          <p className="text-gray-400 mt-1">
            Schedule and manage real-time quiz sessions for your students
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-purple-600 hover:bg-purple-500 px-6 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg shadow-purple-500/20"
        >
          <Plus size={20} />
          Schedule Event
        </button>
      </div>

      {/* MAIN CARD */}
      <div className="bg-[#121216] border border-gray-800/50 rounded-2xl p-8 shadow-xl">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-xl font-semibold text-white">Event Calendar</h2>
            <p className="text-gray-400 mt-1">View and manage your scheduled quiz events</p>
          </div>
        </div>

        {/* FILTER BAR */}
        <div className="flex justify-between items-center mb-8 border-b border-gray-800/50 pb-6">
          <div className="flex gap-3 bg-[#0a0a0c] p-1.5 rounded-2xl border border-gray-800/50">
            {["All Events", "Active", "Upcoming", "Completed"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-xl text-sm font-medium transition-all ${activeTab === tab
                  ? "bg-[#1a1a20] text-white shadow-lg shadow-black/40"
                  : "text-gray-500 hover:text-gray-300"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex gap-4">
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search events..."
                className="bg-[#111115] border border-gray-700/50 w-64 px-4 py-2.5 rounded-xl text-sm outline-none focus:border-purple-500 transition-all pl-10"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                <Search size={16} />
              </span>
            </div>
          </div>
        </div>

        {/* EVENTS LIST */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-12 text-gray-500">Loading events...</div>
          ) : filteredEvents.length === 0 ? (
            <div className="text-center py-12 text-gray-500 border border-dashed border-gray-800 rounded-xl">
              No events found matching your criteria.
            </div>
          ) : (
            filteredEvents.map((event) => (
              <EventItem
                key={event._id}
                event={event}
                onStatusUpdate={handleStatusUpdate}
                onEdit={() => handleEditClick(event)}
                onDelete={handleDeleteEvent}
              />
            ))
          )}
        </div>
      </div>

      <ScheduleEventModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingEvent(null);
        }}
        initialData={editingEvent}
        onConfirm={handleScheduleEvent}
      />
    </div>
  );
}
