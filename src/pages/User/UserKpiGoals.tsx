import axios from "axios";
import { useEffect, useState } from "react";
import { formatDate } from "../../components/Tables/TableThree";

const UserKpiGoals = () => {
  const [pending,setPending]=useState([])
  const [approved,setApproved]=useState([])
  const [data,setData] = useState()
  const fetchTargets = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_USER_URL}/leave/curremptarget`,{withCredentials:true})        
        setData(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    fetchTargets()
  },[])

  if(data) console.log(data);
  

  useEffect(() => {
    if (data) {
      setPending(data.filter((item) => item.marking === false||null));
      setApproved(data.filter((item) => item.marking === true));
    }
  },[data]);



  return (
<>
<h2 className="text-title-md2 my-4 mx-8 font-semibold text-black dark:text-white">Pending</h2>
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Name
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Title
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                KPI Weight
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Start Date
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                End Date
              </th>
            </tr>
          </thead>
          <tbody>
            {data && pending.map((packageItem, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark  xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {packageItem.empname}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark ">
                  <h5 className="font-medium text-black dark:text-white">
                    {packageItem.title}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {packageItem.kpiweight}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {formatDate(packageItem.startdate)}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {formatDate(packageItem.enddate)}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <h2 className="text-title-md2 my-4 mx-8 font-semibold text-black dark:text-white">Approved</h2>
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Name
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Title
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                KPI Weight
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Start Date
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                End Date
              </th>
            </tr>
          </thead>
          <tbody>
            {data &&  approved.map((packageItem, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark  xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {packageItem.empname}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark ">
                  <h5 className="font-medium text-black dark:text-white">
                    {packageItem.title}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {packageItem.kpiweight}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {formatDate(packageItem.startdate)}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {formatDate(packageItem.enddate)}
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

export default UserKpiGoals;
