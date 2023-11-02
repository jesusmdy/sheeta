import { selectActiveTab, setActiveTab } from '@/app/store/ui';
import { useDispatch, useSelector } from 'react-redux';

const useCellUiOptions = () => {
  const dispatch = useDispatch();
  const activeTab = useSelector(selectActiveTab);

  const setTab = (tab: string) => dispatch(setActiveTab(tab));

  return {
    activeTab,
    setTab,
  };
};

export default useCellUiOptions;