import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import TableFive from '../../components/Tables/TableFive';
import DefaultLayout from '../../layout/DefaultLayout';

const Target = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Performance Mangement" />

      <div className="flex flex-col gap-10">
        <TableFive />
      </div>
    </DefaultLayout>
  );
};

export default Target;
