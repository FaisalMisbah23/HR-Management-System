import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import TableTwo from '../../components/Tables/TableTwo';
import DefaultLayout from '../../layout/DefaultLayout';

const LeaveRecall = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Leave Management" />

      <div className="flex flex-col gap-10">
        <TableTwo />
      </div>
    </DefaultLayout>
  );
};

export default LeaveRecall;
