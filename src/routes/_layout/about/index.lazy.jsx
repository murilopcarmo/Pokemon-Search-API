import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_layout/about/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>About</h1>
      <p>This is the About page.</p>
      <button onClick={() => navigate({ to: '/' })}>Go Home</button>
    </div>
  );
}
