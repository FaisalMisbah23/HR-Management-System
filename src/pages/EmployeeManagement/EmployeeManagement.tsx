import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import TableFour from '../../components/Tables/TableFour';
import DefaultLayout from '../../layout/DefaultLayout';

const EmployeeManagement = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Employee Mangement" />
      <div className="flex flex-col gap-10">
        <TableFour />
      </div>
    </DefaultLayout>
  );
};

export default EmployeeManagement;
