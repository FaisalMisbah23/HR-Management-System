import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllEmployees } from '../../features/getCompEmpSlice';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const EditTarget = () => {
  const {targetId} = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    kpiweight: '',
    empname: '',
    startdate: '',
    enddate: ''
  });
  const dispatch = useDispatch();
  const {data} = useSelector((state) => state.allEmployees.data);
  

  useEffect(() => {
    dispatch(fetchAllEmployees());
  }, [dispatch]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_ADMIN_URL}/target/${targetId}`,{
          title:formData.title,
          kpiweight:formData.kpiweight,
          empname:formData.empname,
          startdate:formData.startdate,
          enddate:formData.enddate},
        { withCredentials: true }
      );
      toast.success(response.data.message);
      navigate("/admin/performancemanagement/target")
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An error occurred. Please try again.');
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

const fetchCurrentTarget = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_ADMIN_URL}/target/${targetId}`,{withCredentials:true})
    console.log("res.data",res.data);
    setFormData(res.data.data)
  } catch (error) {
    console.log(error)
  }
}

useEffect(()=>{
  fetchCurrentTarget()
},[])

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Performance Management" />
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Target Setup
            </h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-6.5">
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Title
                  </label>
                  <input
                    type="text"
                    placeholder="Enter the title"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    KPI Weight
                  </label>
                  <input
                    type="number"
                    placeholder="Enter the KPI weight"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    name="kpiweight"
                    value={formData.kpiweight}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="mb-4.5 w-full">
                <label className="mb-2.5 block text-black dark:text-white">
                  Employee
                </label>
                <select
                  name="empname"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={formData.empname}
                  onChange={handleChange}
                >
                  {data && data.map((item) => (
                    <option key={item.EmployeeDetails.name} value={item.EmployeeDetails.name}>
                      {item.EmployeeDetails.name}
                    </option>
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
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    name="startdate"
                    value={formData.startdate}
                    onChange={handleChange}
                  />
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    End Date
                  </label>
                  <input
                    type="date"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    name="enddate"
                    value={formData.enddate}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default EditTarget;
