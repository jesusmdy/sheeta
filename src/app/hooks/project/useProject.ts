import { selectProject, setName } from '@/app/store/project/projectSlicer';
import { useDispatch, useSelector } from 'react-redux';

const useProject = () => {
  const dispatch = useDispatch();

  const project = useSelector(selectProject);

  const setProjectName = (name: string) => {
    dispatch(setName(name));
  };

  return {
    project,
    setProjectName,
  };
};

export default useProject;