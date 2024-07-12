import { fetchAllEmployees } from '../../features/getCompEmpSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { toast } from 'react-toastify';
import axios from 'axios';

const TableFour = () => {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.allEmployees.data);

  const [employeeIdToDelete, setEmployeeIdToDelete] = useState(null);
  const [isDelete, setIsDelete] = useState(false); // Track deletion confirmation

  const openDeleteModal = (employeeId) => {
    setEmployeeIdToDelete(employeeId);
    setOpenModal(true);
  };

  const confirmDelete = async () => {
    setIsDelete(true); // This would be set based on user confirmation in the modal
  };

  useEffect(() => {
    if (isDelete && employeeIdToDelete) {
      deleteEmp(employeeIdToDelete);
    }
  }, [isDelete, employeeIdToDelete]);

  const deleteEmp = async (employeeId) => {
    if (!isDelete) return;

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_USER_URL}/auth/delete/${employeeId}`,
        { withCredentials: true },
      );
      toast.success(response.data.message);
      setOpenModal(false);
      dispatch(fetchAllEmployees());
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An error occurred. Please try again.');
      }
      setOpenModal(false);
    } finally {
      setIsDelete(false); // Reset delete state after operation
    }
  };

  useEffect(() => {
    dispatch(fetchAllEmployees());
  });

 const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so add 1
    const day = String(date.getDate()).padStart(2, '0');

    return `${day}-${month}-${year}`;
  };  

  return (
    <>
      {openModal && (
        <Modal
          show={openModal}
          position="center"
          size="md"
          onClose={() => setOpenModal(false)}
          onConfirm={confirmDelete}
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this employee?
              </h3>
              <div className="flex justify-center gap-4">
                <button
                  onClick={confirmDelete}
                  className="rounded bg-danger p-3 font-medium text-white hover:bg-opacity-90"
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
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Name
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Dept
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Job Title
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Start Date
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Category
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Gender
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {data && data?.map((packageItem, key) => (
                <>
                  <tr key={key}>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white">
                        {packageItem.EmployeeDetails.name.split(' ')[0]}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <h5 className="font-medium text-black dark:text-white">
                        {packageItem.EmployeeDetails.department}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {packageItem.EmployeeDetails.jobtitle}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {formatDate(packageItem.EmployeeDetails.startdate)}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {packageItem.EmployeeDetails.jobcategory}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {packageItem.EmployeeDetails.gender}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        <Link
                          to={`/admin/emplyeemanagement/update/${packageItem.EmployeeDetails._id}`}
                        >
                          {' '}
                          <button className="hover:text-primary">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18px"
                              height="18px"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="currentColor"
                                d="m7 17.013l4.413-.015l9.632-9.54c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.756-.756-2.075-.752-2.825-.003L7 12.583zM18.045 4.458l1.589 1.583l-1.597 1.582l-1.586-1.585zM9 13.417l6.03-5.973l1.586 1.586l-6.029 5.971L9 15.006z"
                              />
                              <path
                                fill="currentColor"
                                d="M5 21h14c1.103 0 2-.897 2-2v-8.668l-2 2V19H8.158c-.026 0-.053.01-.079.01c-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2"
                              />
                            </svg>
                          </button>
                        </Link>
                        <button
                          onClick={() => openDeleteModal(packageItem.EmployeeDetails._id)}
                          className="hover:text-primary"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18px"
                            height="18px"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TableFour;
