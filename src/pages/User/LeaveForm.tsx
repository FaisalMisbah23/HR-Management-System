import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLeaveTypes } from "../../features/getLeaveTypes";
import { toast } from 'react-toastify';
import axios from "axios";

const LeaveForm = () => {
  const { data } = useSelector((state) => state.leaveTypes.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLeaveTypes());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    startDate: '', 
    endDate: '', 
    resumptionDate: '', 
    type: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const calculateDuration = () => {
    const { startDate, endDate } = formData;
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const duration = (end - start) / (1000 * 60 * 60 * 24) + 1; // Duration in days
      return duration > 0 ? duration : 0;
    }
    return 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { startDate, endDate, resumptionDate, type } = formData;

    if (!startDate || !endDate || !resumptionDate || !type) {
      console.log(startDate, endDate, resumptionDate, type);
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_USER_URL}/leave/`, {
        startDate,
        endDate,
        resumptionDate,
        type,
      },{withCredentials:true});
      toast.success(response.data.message);
        setFormData({
          startDate: '',
          endDate: '',
          resumptionDate: '',
          type: '',
        });
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An error occured please try again ');
      }
    }
  };



  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:p-8 sm:pt-0 md:pt-2 pt-4">
      <div className="py-4 px-6.5 dark:border-strokedark">
        <h1 className="font-bold text-textdark text-3xl mb-4 text-center">Leave Application</h1>
        <h3 className="font-medium text-xl text-black mb-4 text-center">
          Fill the required fields below to apply for leave.
        </h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="p-6.5">
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Leave Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            >
              {data && data.map((p) => (
                <option key={p.leaveplan} value={p.leaveplan}>{p.leaveplan}</option>
              ))}
            </select>
          </div>
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
          </div>
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                Duration
              </label>
              <input
                type="number"
                value={calculateDuration()}
                disabled
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                Resumption Date
              </label>
              <input
                type="date"
                name="resumptionDate"
                value={formData.resumptionDate}
                onChange={handleChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="mb-2.5 block text-black dark:text-white">
              Reason for leave
            </label>
            <textarea
              rows={6}
              name="reason"
              placeholder="Type your Reason"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            ></textarea>
          </div>

          <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default LeaveForm;
