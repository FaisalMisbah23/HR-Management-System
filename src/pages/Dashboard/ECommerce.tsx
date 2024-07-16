import React,{useState,useEffect,useMemo} from 'react';
import CardDataStats from '../../components/CardDataStats';
import ChartOne from '../../components/Charts/ChartOne';
import ChartThree from '../../components/Charts/ChartThree';
import ChartTwo from '../../components/Charts/ChartTwo';
import ChatCard from '../../components/Chat/ChatCard';
import MapOne from '../../components/Maps/MapOne';
import TableOne from '../../components/Tables/TableOne';
import DefaultLayout from '../../layout/DefaultLayout';
import axios from 'axios';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaClipboard, FaCheck } from 'react-icons/fa';
import TableFour from '../../components/Tables/TableFour';
import Loader from '../../common/Loader';


const ECommerce: React.FC = () => {
  const [data,setData] = useState()
  const [copied, setCopied] = useState(false);
  const [completedProjects,setCompletedProjects]=useState(0)
  const [pendingProjects,setPendingProjects]=useState(0)
  const [dates,setDates]=useState([])

  const fetchData = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_ADMIN_URL}/company/dashboard`,
      { withCredentials: true },
    );
      setData(res.data.data[0])
  };

useEffect(()=>{
  fetchData()
},[])


const handleCopied = () =>{
  setCopied(true)
  setTimeout(() => {
    setCopied(false)
  }, 2500);
}

// encryption function 
function simpleEncrypt(text, key) {
 if(text && key){
  let encrypted = "";
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i) ^ key.charCodeAt(i % key.length);
    encrypted += String.fromCharCode(charCode);
  }
  return btoa(encrypted); // Base64 encode the result for easy handling
 }
}


const projectCounts = useMemo(() => {
  let completed = 0;
  let pending = 0;
  let newDates = [];
  if (data) {
    data.targets.forEach(e => {
      if (e.marking) {
        completed++;
        newDates.push(e.updatedAt);
      } else {
        pending++;
      }
    });
  }

  return { completed, pending, newDates }; // Include newDates in the returned object
}, [data]);

useEffect(() => {
  setCompletedProjects(projectCounts.completed);
  setPendingProjects(projectCounts.pending);
  setDates(projectCounts.newDates); // Correctly access newDates
}, [projectCounts]);


const getPercentage = (num1,num2) => {
  return Math.ceil((num1/num2)*100) + "%"
}


  return (
    <DefaultLayout>

<div className="bg-gradient-to-r from-[#121C3E] to-[#64748b] font-sans px-6 py-12 mb-6">
      <div className="container mx-auto flex flex-col justify-center items-center text-center">
        <h2 className="text-white sm:text-6xl text-4xl font-bold mb-8">{data?.name}</h2>
        <CopyToClipboard text={simpleEncrypt(data?._id,"a1b2c3d4")} onCopy={() =>handleCopied()}>
          <button className="bg-white text-gray-700 font-bold py-2 px-4 rounded flex items-center">
            {copied ? (
              <>
                <FaCheck className="mr-2 text-green-500" />
                Copied!
              </>
            ) : (
              <>
                <FaClipboard className="mr-2" />
                Company code for employees to sign up.
              </>
            )}
          </button>
        </CopyToClipboard>
      </div>
    </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      <CardDataStats title="Performance" total={getPercentage(completedProjects,data?.targetCount)}>
        <svg  className="fill-primary dark:fill-white" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
	<path fill="" d="M3 22V8h4v14zm7 0V2h4v20zm7 0v-8h4v8z" />
</svg>
        </CardDataStats>
        <CardDataStats title="Projects" total={data?.targetCount}>
        <svg className="fill-primary dark:fill-white"
 xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 36 36">
	<path fill="" d="M29.29 34H6.71A1.7 1.7 0 0 1 5 32.31V6.69A1.75 1.75 0 0 1 7 5h2v2H7v25h22V7h-2V5h2.25A1.7 1.7 0 0 1 31 6.69v25.62A1.7 1.7 0 0 1 29.29 34" class="clr-i-outline clr-i-outline-path-1" />
	<path fill="" d="M16.66 25.76L11.3 20.4a1 1 0 0 1 1.42-1.4l3.94 3.94l8.64-8.64a1 1 0 0 1 1.41 1.41Z" class="clr-i-outline clr-i-outline-path-2" />
	<path fill="" d="M26 11H10V7.33A2.34 2.34 0 0 1 12.33 5h1.79a4 4 0 0 1 7.75 0h1.79A2.34 2.34 0 0 1 26 7.33ZM12 9h12V7.33a.33.33 0 0 0-.33-.33H20V6a2 2 0 0 0-4 0v1h-3.67a.33.33 0 0 0-.33.33Z" class="clr-i-outline clr-i-outline-path-3" />
	<path fill="none" d="M0 0h36v36H0z" />
</svg>
        </CardDataStats>
        <CardDataStats title="Completed" total={completedProjects}>
        <svg  className="fill-primary dark:fill-white" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 32 32">
	<path fill="" d="m22 27.18l-2.59-2.59L18 26l4 4l8-8l-1.41-1.41z" />
	<path fill="" d="M25 5h-3V4a2.006 2.006 0 0 0-2-2h-8a2.006 2.006 0 0 0-2 2v1H7a2.006 2.006 0 0 0-2 2v21a2.006 2.006 0 0 0 2 2h9v-2H7V7h3v3h12V7h3v11h2V7a2.006 2.006 0 0 0-2-2m-5 3h-8V4h8Z" />
</svg>
        </CardDataStats>
        <CardDataStats title="Total Employees" total={data?.employeeCount}>
          <svg  className="fill-primary dark:fill-white"
            width="22"
            height="18"
            viewBox="0 0 22 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.18418 8.03751C9.31543 8.03751 11.0686 6.35313 11.0686 4.25626C11.0686 2.15938 9.31543 0.475006 7.18418 0.475006C5.05293 0.475006 3.2998 2.15938 3.2998 4.25626C3.2998 6.35313 5.05293 8.03751 7.18418 8.03751ZM7.18418 2.05626C8.45605 2.05626 9.52168 3.05313 9.52168 4.29063C9.52168 5.52813 8.49043 6.52501 7.18418 6.52501C5.87793 6.52501 4.84668 5.52813 4.84668 4.29063C4.84668 3.05313 5.9123 2.05626 7.18418 2.05626Z"
              fill=""
            />
            <path
              d="M15.8124 9.6875C17.6687 9.6875 19.1468 8.24375 19.1468 6.42188C19.1468 4.6 17.6343 3.15625 15.8124 3.15625C13.9905 3.15625 12.478 4.6 12.478 6.42188C12.478 8.24375 13.9905 9.6875 15.8124 9.6875ZM15.8124 4.7375C16.8093 4.7375 17.5999 5.49375 17.5999 6.45625C17.5999 7.41875 16.8093 8.175 15.8124 8.175C14.8155 8.175 14.0249 7.41875 14.0249 6.45625C14.0249 5.49375 14.8155 4.7375 15.8124 4.7375Z"
              fill=""
            />
            <path
              d="M15.9843 10.0313H15.6749C14.6437 10.0313 13.6468 10.3406 12.7874 10.8563C11.8593 9.61876 10.3812 8.79376 8.73115 8.79376H5.67178C2.85303 8.82814 0.618652 11.0625 0.618652 13.8469V16.3219C0.618652 16.975 1.13428 17.4906 1.7874 17.4906H20.2468C20.8999 17.4906 21.4499 16.9406 21.4499 16.2875V15.4625C21.4155 12.4719 18.9749 10.0313 15.9843 10.0313ZM2.16553 15.9438V13.8469C2.16553 11.9219 3.74678 10.3406 5.67178 10.3406H8.73115C10.6562 10.3406 12.2374 11.9219 12.2374 13.8469V15.9438H2.16553V15.9438ZM19.8687 15.9438H13.7499V13.8469C13.7499 13.2969 13.6468 12.7469 13.4749 12.2313C14.0937 11.7844 14.8499 11.5781 15.6405 11.5781H15.9499C18.0812 11.5781 19.8343 13.3313 19.8343 15.4625V15.9438H19.8687Z"
              fill=""
            />
          </svg>
        </CardDataStats>
      </div>

      <div className="mt-4 grid grid-cols-12 w-full gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne dates={dates}/>
        <div className="col-span-12 xl:col-span-8">
          <TableFour />
        </div>
        <ChatCard data={data} />
      </div>
    </DefaultLayout>
  );
};

export default ECommerce;
