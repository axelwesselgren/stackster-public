function ErrorScreen({
	title,
	message
}: {
	title: string;
	message: string;
}) {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-muted-foreground mt-1">{message}</p>
    </div>
  );
}

export { ErrorScreen };