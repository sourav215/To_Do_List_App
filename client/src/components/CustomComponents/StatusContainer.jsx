const StatusContainer = ({ status }) => {
  const STATUS_BG = {
    pending: "bg-blue-200",
    completed: "bg-green-200",
    progress: "bg-amber-200",
    all: "bg-purple-200",
  };
  const STATUS_TEXT = {
    pending: "text-blue-700",
    completed: "text-green-700",
    progress: "text-amber-700",
    all: "text-purple-700",
  };
  const STATUS_TITLE = {
    pending: "Pending",
    completed: "Completed",
    progress: "Progress",
    all: "All",
  };
  return (
    <p
      className={`${STATUS_BG[status]} ${STATUS_TEXT[status]} px-3 py-1 rounded-full text-xs`}
    >
      {STATUS_TITLE[status]}
    </p>
  );
};
export default StatusContainer;
