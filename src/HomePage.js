import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Modal from 'react-bootstrap/Modal';
import CalendarForm from './CalendarForm';
import { observer } from './mobx-react';
import { getCalendar } from './requests';
const localizer = momentLocalizer(moment);

function HomePage({ calendarStore }) {
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [calendarEvent, setCalendarEvent] = useState({});
    const [initialized, setInitialized] = useState(false);
    const hideModals = () => {
        setShowAddModal(false);
        setShowEditModal(false);
    }
    const getCalendarEvents = async () => {
        const response = await getCalendar();
        const evs = response.data.map(d => {
            return {
                ...d, 
                start: new Date(d.start),
                end: new Date(d.end)
            };
        });
        calendarStore.setCalendarEvents(evs);
        setInitialized(true);
    };
    const handleSelect = (event, e) => {
        const { start, end } = event;
        const data = { title: "", start, end, allDay: false };
        setShowAddModal(true);
        setShowEditModal(false);
        setCalendarEvent(data);
    };
    const handleSelectEvent = (event, e) => {
        setShowAddModal(false);
        setShowEditModal(true);
        let { id, title, start, end, allDay } = event;
        start = new Date(start);
        end = new Date(end);
        const data = { id, title, start, end, allDay };
        setCalendarEvent(data);
    };
    useEffect(() => {
        if (!initialized) {
            getCalendarEvents();
        }
    });

    return (
        <div>
            
        </div>
    )
}

export default HomePage;
