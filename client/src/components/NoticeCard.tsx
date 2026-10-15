
type NoticeCardProps = {
  title: string;
  message: string;
  createdAt?: string;
};

function NoticeCard({ title, message, createdAt }: NoticeCardProps) {
  return (
    <div className="notice-card">
      <h3>{title}</h3>
      <p>{message}</p>
      {createdAt && (
        <small>{new Date(createdAt).toLocaleString()}</small>
      )}
    </div>
  );
}

export default NoticeCard;
