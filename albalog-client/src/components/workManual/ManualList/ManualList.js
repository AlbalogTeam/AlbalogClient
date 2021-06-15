import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { connect } from 'react-redux';

const ManualList = ({ category, user, shop }) => {
  const [manualList, setManualList] = useState([]);
  console.log(`category: ${category}`);
  useEffect(() => {
    if (category === 'all') {
      setManualList(shop.workManuals);
    } else {
      const filterHandle = async () => {
        const WorkManualList = await shop.workManuals.filter(
          (manual) => manual.category_id.name === category,
        );

        setManualList(WorkManualList);
      };

      filterHandle();
    }

    console.log(manualList);
  }, [shop, category]);


  return (
    <div className="manual-list">
      {manualList && (
        <ul>
          {manualList.map((manual, index) => {
            return (
              <li key={index}>
                <div className="manual-title">
                  {manual.title}
                  <div className="ico">
                    <button className="btn">
                      <AiOutlineEdit size="22" />
                    </button>
                    <button className="btn">
                      <AiOutlineDelete size="22" />
                    </button>
                  </div>
                </div>
                <br />
                <div dangerouslySetInnerHTML={{ __html: manual.content }}></div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

function mapStateToProps(state) {
  return { shop: state.shop, user: state.user };
}

export default connect(mapStateToProps)(ManualList);
