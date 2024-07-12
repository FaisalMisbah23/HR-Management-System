import {useSelector,useDispatch} from 'react-redux'
import {useEffect, useState} from 'react'
import { formatDate } from './TableThree';
import { fetchAllLeaves } from '../../features/adminGetAllEmpLeaves';
import axios from 'axios';
import {toast} from 'react-toastify'

const TableTwo = () => {
  const [pending,setPending]=useState([])
  const [approved,setApproved]=useState([])
  const [declined,setDeclined]  =useState([])
  const {data}=useSelector((state)=>state.allleaves.data)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllLeaves());
  },);

  useEffect(() => {
    if (data) {
      setPending(data.filter((item) => item.status === 'Pending'));
      setApproved(data.filter((item) => item.status === 'Approved'));
      setDeclined(data.filter((item) => item.status === 'Declined'));
    }
  },[data]);

  const toggleStatus = async (status:String,leaveId:String) => {

    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_ADMIN_URL}/leavetype/toggleleavestatus/${leaveId}`,
        {
          status:status
        },{withCredentials:true}
      );
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An error occurred. Please try again.');
      }
    }
  };

  
  return (
    <>
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">        
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Name
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Duration
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Start Date
              </th>
              <th className="min-w-[120px] py-4 font-medium text-black dark:text-white">
                End Date
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Type
              </th>
              <th className="py-4 px-16 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data && pending.map((packageItem, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {packageItem.empName}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {packageItem.duration}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {formatDate(packageItem.startDate)}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {formatDate(packageItem.endDate)}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {packageItem.leaveplan}
                  </p>
                </td>
                <td className="flex items-center gap-4 border-b border-[#eee] py-5 dark:border-strokedark">
                  <button onClick={()=>toggleStatus("Approved",packageItem._id)} className='text-white bg-success hover:hover:bg-opacity-90  px-4 py-2 font-medium'>Approve</button>
                  <button onClick={()=>toggleStatus("Declined",packageItem._id)} className='text-white bg-danger  hover:hover:bg-opacity-90 px-4 py-2 font-medium'>Decline</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <h2 className="text-title-md2 font-semibold text-black dark:text-white">Approved</h2>
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">        
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Name
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Duration
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Start Date
              </th>
              <th className="min-w-[120px] py-4 font-medium text-black dark:text-white">
                End Date
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Type
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Reason
              </th>
            </tr>
          </thead>
          <tbody>
            {data && approved.map((packageItem, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {packageItem.empName}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {packageItem.duration}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {formatDate(packageItem.startDate)}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {formatDate(packageItem.endDate)}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {packageItem.leaveplan}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {packageItem.reason}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <h2 className="text-title-md2 font-semibold text-black dark:text-white">Declined</h2>
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">        
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Name
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Duration
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Start Date
              </th>
              <th className="min-w-[120px] py-4 font-medium text-black dark:text-white">
                End Date
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Type
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Reason
              </th>
            </tr>
          </thead>
          <tbody>
            {data && declined.map((packageItem, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {packageItem.empName}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {packageItem.duration}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {formatDate(packageItem.startDate)}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {formatDate(packageItem.endDate)}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {packageItem.leaveplan}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {packageItem.reason}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </>
  );
};

export default TableTwo;
