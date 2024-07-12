import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import TableOne from '../../components/Tables/TableOne';
import DefaultLayout from '../../layout/DefaultLayout';
import { useState ,useEffect} from 'react';
import axios from 'axios';
import {toast} from 'react-toastify'
import {useDispatch,useSelector} from 'react-redux'
import { fetchLeaveTypes } from '../../features/getLeaveTypes';
import { Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

const LeaveSettings = () => {

  const dispatch = useDispatch()
  const {data} = useSelector((state)=>state.leaveTypes.data)
                  
  const [isChecked, setIsChecked] = useState(false)
  const [formData, setFormData] = useState({
    leaveplan: '',
    duration: '',
    recall:false,
    reason: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_ADMIN_URL}/leavetype/create`,
        {
          leaveplan: formData.leaveplan,
          duration: formData.duration,
          recall: isChecked,
          reason: formData.reason,
        },
        { withCredentials: true },
      );
      toast.success(response.data.message);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An error occurred. Please try again.');
      }
    }
  };

  useEffect(()=>{
    dispatch(fetchLeaveTypes())
  },[dispatch,handleSubmit])

  // edit functionality
  const [edit , setEdit] = useState()
  const [openModal, setOpenModal] = useState(false);
  const [leaveIdToUpdate, setLeaveIdToUpdate] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false); // Track deletion confirmation

  useEffect(()=>{
    if(edit){
      setFormData({
          leaveplan:edit.leaveplan,
          duration:edit.duration,
          recall:edit.recall,
          reason:edit.reason,
          _id:edit._id
      })
      setIsChecked(edit.recall?true:false)
    }
  },[edit])

  const openUpdateModal = (leaveId) => {
    setLeaveIdToUpdate(leaveId);
    setOpenModal(true);
  };

  const confirmUpdate = async (e) => {
    setIsUpdate(true); // This would be set based on user confirmation in the modal
  };

  useEffect(() => {
    if (isUpdate && leaveIdToUpdate) {
      updateLeavePlan(leaveIdToUpdate);
    }
  }, [isUpdate, leaveIdToUpdate]);

  const updateLeavePlan = async (leaveId) => {
    if (!isUpdate) return;

    try {      
      const response = await axios.patch(
        `${import.meta.env.VITE_ADMIN_URL}/leavetype/${leaveId}`,
        {leaveplan:formData.leaveplan, duration:formData.duration, recall:isChecked, reason:formData.reason},
        { withCredentials: true },
      );
      toast.success(response.data.message);
      setOpenModal(false);
      setFormData({
        leaveplan: '',
        duration: '',
        recall:false,
        reason: '',
      })
      setEdit()
      dispatch(fetchLeaveTypes());
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An error occurred. Please try again.');
      }
      setOpenModal(false);
    } finally {
      setIsUpdate(false); // Reset delete state after operation
    }
  };

// delete leave plan

const [leaveIdToDelete, setLeaveIdToDelete] = useState(null);
const [isDelete, setIsDelete] = useState(false); // Track deletion confirmation
const [openDelModal, setOpenDelModal] = useState(false); // Track deletion confirmation

const openDeleteModal = (leaveId) => {
  setLeaveIdToDelete(leaveId);
  setOpenDelModal(true);
};

const confirmDelete = async () => {
  setIsDelete(true); // This would be set based on user confirmation in the modal
};

useEffect(() => {
  if (isDelete && leaveIdToDelete) {
    deleteLeave(leaveIdToDelete);
  }
}, [isDelete, leaveIdToDelete]);

const deleteLeave = async (leaveId) => {
  if (!isDelete) return;

  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_ADMIN_URL}/leavetype/${leaveId}`,
      { withCredentials: true },
    );
    toast.success(response.data.message);
    setOpenDelModal(false);
    dispatch(fetchLeaveTypes());
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data.message);
    } else {
      toast.error('An error occurred. Please try again.');
    }
    setOpenDelModal(false);
  } finally {
    setIsDelete(false); // Reset delete state after operation
  }
};




  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Leave Management" />
        <div className="grid grid-cols-5 gap-8">
        {openModal && (
                  <Modal
                    show={openModal}
                    position="center"
                    size="md"
                    onClose={() => setOpenModal(false)}
                    onConfirm={confirmUpdate}
                  >
                    <Modal.Header />
                    <Modal.Body>
                      <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                          Are you sure you want to update this leave plan?
                        </h3>
                        <div className="flex justify-center gap-4">
                          <button
                            onClick={confirmUpdate}
                            className="rounded bg-success p-3 font-medium text-white hover:bg-opacity-90"
                          >
                            {"Yes, I'm sure"}
                          </button>
                          <button
                            onClick={() => setOpenModal(false)}
                            className="rounded bg-primary p-3 font-medium text-white hover:bg-opacity-90"
                          >
                            No, cancel
                          </button>
                        </div>
                      </div>
                    </Modal.Body>
                  </Modal>
                )}


        {openDelModal && (
                  <Modal
                    show={openDelModal}
                    position="center"
                    size="md"
                    onClose={() => setOpenDelModal(false)}
                    onConfirm={confirmDelete}
                  >
                    <Modal.Header />
                    <Modal.Body>
                      <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                          Are you sure you want to delete this leave plan?
                        </h3>
                        <div className="flex justify-center gap-4">
                          <button
                            onClick={confirmDelete}
                            className="rounded bg-danger p-3 font-medium text-white hover:bg-opacity-90"
                          >
                            {"Yes, I'm sure"}
                          </button>
                          <button
                            onClick={() => setOpenDelModal(false)}
                            className="rounded bg-primary p-3 font-medium text-white hover:bg-opacity-90"
                          >
                            No, cancel
                          </button>
                        </div>
                      </div>
                    </Modal.Body>
                  </Modal>
                )}
        
          <div className="col-span-5 xl:col-span-3">
         {edit?(
          <>
             <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
             <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
               <h3 className="font-medium text-black dark:text-white">
                 Update Leave Settings
               </h3>
             </div>
             <div className="p-7">
               <form onSubmit={(e)=>e.preventDefault()}>
                 <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                   <div className="w-full sm:w-1/2">
                     <label
                       className="mb-3 block text-sm font-medium text-black dark:text-white"
                       htmlFor="leaveplan"
                     >
                       Name
                     </label>
                     <input
                       className="w-full rounded border border-stroke py-3 pl-4.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                       type="text"
                       name="leaveplan"
                       id="leaveplan"
                       placeholder="Enter you leave plan name"
                       value={formData.leaveplan}
                       onChange={handleChange}
                     />
                   </div>
                   <div className="w-full sm:w-1/2">
                     <label
                       className="mb-3 block text-sm font-medium text-black dark:text-white"
                       htmlFor="duration"
                     >
                       Duration (days)
                     </label>
                     <input
                       className="w-full rounded border border-strokegray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                       type="number"
                       name="duration"
                       id="duration"
                       placeholder="Enter duration"
                       value={formData.duration}
                       onChange={handleChange}
                     />
                   </div>
                 </div>
                 <div className="mb-5.5">
                   <div className="w-full">
                     <label
                       className="mb-3 block text-sm font-medium text-black dark:text-white"
                       htmlFor="reason"
                     >
                       Reason
                     </label>
                     <input
                       className="w-full rounded border border-stroke py-3 pl-4.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                       type="text"
                       name="reason"
                       id="reason"
                       placeholder="Enter reason"
                       value={formData.reason}
                       onChange={handleChange}
                     />
                   </div>
                 </div>
                 <div className="mb-5.5">
                   <div className="w-full flex items-start gap-8 flex-wrap">
                     <label
                       className="mb-3 block text-lg font-medium text-black dark:text-white"
                       htmlFor="recall"
                     >
                       Do you want to activate Leave Recall for this plan ?
                     </label>
                     <input
                       className="rounded border border-stroke p-4"
                       type="checkbox"
                       name="recall"
                       id="recall"
                       value={formData.recall}
                       onChange={()=>{isChecked?setIsChecked(false):setIsChecked(true)}}
                       checked={isChecked}
                     />
                   </div>
                 </div>
                 <div className="flex justify-end gap-4.5">
                   <button
                   onClick={()=>openUpdateModal(formData._id)}
                     className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                     type="submit"
                   >
                     Update
                   </button>
                 </div>
               </form>
             </div>
           </div></>
         ):(
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Create Leave Settings
            </h3>
          </div>
          <div className="p-7">
            <form onSubmit={handleSubmit}>
              <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                <div className="w-full sm:w-1/2">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="leaveplan"
                  >
                    Name
                  </label>
                  <input
                    className="w-full rounded border border-stroke py-3 pl-4.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    type="text"
                    name="leaveplan"
                    id="leaveplan"
                    placeholder="Enter your leave plan name"
                    value={formData.leaveplan}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full sm:w-1/2">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="duration"
                  >
                    Duration (days)
                  </label>
                  <input
                    className="w-full rounded border border-strokegray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    type="number"
                    name="duration"
                    id="duration"
                    placeholder="Enter duration"
                    value={formData.duration}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="mb-5.5">
                <div className="w-full">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="reason"
                  >
                    Reason
                  </label>
                  <input
                    className="w-full rounded border border-stroke py-3 pl-4.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    type="text"
                    name="reason"
                    id="reason"
                    placeholder="Enter reason"
                    value={formData.reason}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="mb-5.5">
                <div className="w-full flex items-start gap-8 flex-wrap">
                  <label
                    className="mb-3 block text-lg font-medium text-black dark:text-white"
                    htmlFor="recall"
                  >
                    Do you want to activate Leave Recall for this plan ?
                  </label>
                  <input
                    className="rounded border border-stroke p-4"
                    type="checkbox"
                    name="recall"
                    id="recall"
                    value={formData.recall}
                    onChange={()=>isChecked?setIsChecked(false):setIsChecked(true)}
                    checked={isChecked}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-4.5">
                <button
                  className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                  type="submit"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
         )}
          </div>
          <div className="col-span-5 xl:col-span-2">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Manage Leave Settings
                </h3>
              </div>
              <TableOne openDeleteModal={openDeleteModal} setEdit={setEdit} data={data} />
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default LeaveSettings;
