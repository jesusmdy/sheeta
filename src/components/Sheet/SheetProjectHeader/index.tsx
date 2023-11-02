'use client';
import useProject from '@/app/hooks/project/useProject';
import { CompoundButton, SelectTabData, SelectTabEvent, SelectTabEventHandler, Tab, TabList, Toolbar, ToolbarButton } from '@fluentui/react-components';
import { CalendarMonthRegular } from '@fluentui/react-icons';
import { FC } from 'react';
import './index.scss';
import { cellOptionsTabs } from '@/utils/tabs';
import _ from 'lodash';
import useCellUiOptions from '@/app/hooks/ui/useCellUiOptions';

const ProjectOptions: FC = () => {
  const { project } = useProject();

  return (
    <CompoundButton
      icon={<CalendarMonthRegular />}
      secondaryContent={project.name}
      size="small"
    >
      <span>Project</span>
    </CompoundButton>
  );
};

const CellOptionsTabs: FC = () => {
  const { activeTab, setTab } = useCellUiOptions();
  const handleSetTab = (event: SelectTabEvent, data: SelectTabData) => {
    setTab(data.value as string);
  };
  return (
    <TabList
      selectedValue={activeTab}
      onTabSelect={handleSetTab}
    >
      {
        _.map(
          cellOptionsTabs,
          (tab) => (
            <Tab key={tab.value} value={tab.value}>{tab.label}</Tab>
          )
        )
      }
    </TabList>
  );
};

const SheetProjectHeader: FC = () => {
  return (
    <div className="project-header">
      <ProjectOptions />
      <div className="project-options">
        <CellOptionsTabs />
      </div>
    </div>
  )
};

export default SheetProjectHeader;