import React, {useState} from "react";
import {Badge, Tooltip} from "reactstrap";
import Octicon, {X} from "@primer/octicons-react";

const CompleteBadge = ({item, toggleComplete}) =>
{
  const [tooltipIsOpen, setTooltipIsOpen] = useState(false);

  const toggleTooltip = () =>
  {
    setTooltipIsOpen(!tooltipIsOpen);
  };

  if (item.complete)
  {
    return (
      <>
        <Badge className="completedBadge">
          Complete
          <button
            id="markIncomplete"
            className="markIncomplete"
            onClick={toggleComplete.bind(null, item)}
          >
            <Octicon className="markIncompleteIcon" icon={X}/>
          </button>
        </Badge>
        <Tooltip
          target="markIncomplete"
          placement="top-start"
          delay={{show: 50, hide: 300}}
          isOpen={tooltipIsOpen}
          toggle={toggleTooltip}
        >
          Remove Complete Status
        </Tooltip>
      </>
    );
  }
  else
  {
    return null;
  }
};

export default CompleteBadge;
