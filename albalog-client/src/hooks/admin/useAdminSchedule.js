import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import client from 'utils/api/client';

export default function useAdminSchedule() {
  const employeeList = useSelector(({ shop }) => shop.employees);
  const [createModalOpend, setcreateModalOpend] = useState(false);
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const [infoModalOpened, setInfoModalOpened] = useState(false);
  const locationId = useSelector(({ shop }) => shop._id);
  const [events, setEvents] = useState([]);
  const [employee, setEmployee] = useState('');

  const handleCreateModal = () => {
    setcreateModalOpend(!createModalOpend);
  };

  const handleDeleteModal = (e) => {
    setDeleteModalOpened(!deleteModalOpened);
  };

  const handleInfoModal = (e) => {
    setEmployee(e);
    setInfoModalOpened(!infoModalOpened);
  };

  const eventStyleGetter = (event) => {
    let key = '';
    for (let i = 0; i < event.title.length; i++) {
      key += event.title.charCodeAt(i);
    }
    let color = String(key.toString(16)).substr(9, 6);
    let backgroundColor = '#' + color;
    let style = {
      backgroundColor: backgroundColor,
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block',
    };
    return {
      style: style,
    };
  };

  useEffect(() => {
    const getAllSchedule = async () => {
      try {
        const response = await client.get(`/shift/location/${locationId}`);
        const newEvents = response.data.map((employee) => {
          const schedule = {
            title: employee.title,
            start: new Date(
              new Date(employee.start).getTime() - 540 * 60 * 1000,
            ),
            end: new Date(new Date(employee.end).getTime() - 540 * 60 * 1000),
            index: employee._id,
            staffId: employee.staffId,
          };
          return schedule;
        });

        setEvents(newEvents);
      } catch (e) {
        console.error(e);
      }
    };

    getAllSchedule();
  }, [infoModalOpened, deleteModalOpened, createModalOpend, locationId]);
  return {
    employeeList,
    employee,
    locationId,
    createModalOpend,
    deleteModalOpened,
    infoModalOpened,

    handleInfoModal,
    handleCreateModal,
    handleDeleteModal,
    eventStyleGetter,
    events,
  };
}
