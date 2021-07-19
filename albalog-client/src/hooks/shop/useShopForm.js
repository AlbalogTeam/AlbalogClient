import { ShopFormField } from 'modules/shop';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

export default function useShopForm() {
  const dispatch = useDispatch();
  const [addressSearchOpen, setAddressSearchOpen] = useState(false);

  // 카카오 우편주소 클릭시 작동하는 함수
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    dispatch(ShopFormField({ key: 'address', value: fullAddress }));
    setAddressSearchOpen(!addressSearchOpen);
  };

  // 카카오 우편번호  토글
  const PostOpen = useCallback(() => {
    setAddressSearchOpen(!addressSearchOpen);
  }, [addressSearchOpen]);

  // input 상태관리
  const onChange = (e) => {
    const { name, value } = e.target;
    const body = {
      key: name,
      value,
    };
    dispatch(ShopFormField(body));
  };

  return {
    handleComplete,
    PostOpen,
    onChange,
    addressSearchOpen,
  };
}
