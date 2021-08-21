import { Fragment , useState, useEffect } from "react";
import AddFood from "./AddFood";
import { Table, Divider } from 'antd';
import { useSelector } from "react-redux";
import { fetchFoods } from "../actions/foods";


const FoodPage = () => {
    const auth = useSelector(state => state.auth)
    const alert = useSelector(state => state.alert)
    const [listfoods, setListfoods] = useState([])

    useEffect(() => { 
        const displayFoods = async () =>{
            const response = await fetchFoods(auth.kitchenId)
            console.log(response);
            setListfoods(response)
            console.log(listfoods);
        }
        displayFoods()
    }, [alert])

    const columns = [
        {
          title: 'Food',
          dataIndex: 'food',
          render: (text) => <a>{text}</a>,
        },
        {
          title: 'Category',
          dataIndex: 'category',
        },
        {
          title: 'Sub-Category',
          dataIndex: 'subcategory',
        },
        ///
        {
            title: 'Price',
            dataIndex: 'price',
          },
          {
            title: 'Step',
            dataIndex: `step`,
          },
          {
            title: 'Image',
            dataIndex: 'photo',
            render: (text) => <img style={{width:"80px", height:"80px"}} src={text} alt='food image'></img>
          },
      ];
      const data = listfoods
    const [selectionType, setSelectionType] = useState('checkbox');

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
          disabled: record.food === 'Disabled User',
          // Column configuration not to be checked
          food: record.food,
        }),
      };
  return (
    <Fragment>
      <div className="row">
        <div className="card">
          <div className="card_title">
            <h3>Kitchen Foods </h3>
            <AddFood />
          </div>
          <hr />
          <div>

      <Divider />

      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
      />
    </div>
        </div>
      </div>
    </Fragment>
  );
};

export default FoodPage;