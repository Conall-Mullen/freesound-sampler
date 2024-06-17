import { useSamplerStore } from "../../../stores/useSamplerStore";
import { useSession } from "next-auth/react";
import SaveButton from "../SaveButton";
import Search from "../Search";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Tabs() {
  const router = useRouter();
  const { data: session } = useSession();

  const updateViewMixer = useSamplerStore((state) => state.updateViewMixer);
  const updateViewSearchBar = useSamplerStore(
    (state) => state.updateViewSearchBar
  );
  const updateViewSaveButton = useSamplerStore(
    (state) => state.updateViewSaveButton
  );
  const viewSearchBar = useSamplerStore((state) => state.viewSearchBar);
  const viewMixer = useSamplerStore((state) => state.viewMixer);
  const viewSaveButton = useSamplerStore((state) => state.viewSaveButton);

  return (
    <div className="tabs-container">
      <button
        onClick={() => updateViewSearchBar(!viewSearchBar)}
        className="tab-button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FFF"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-search"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </button>
      {viewSearchBar ? <Search /> : null}
      <button
        onClick={() => updateViewMixer(!viewMixer)}
        className="tab-button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FFF"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-sliders-vertical"
        >
          <line x1="4" x2="4" y1="21" y2="14" />
          <line x1="4" x2="4" y1="10" y2="3" />
          <line x1="12" x2="12" y1="21" y2="12" />
          <line x1="12" x2="12" y1="8" y2="3" />
          <line x1="20" x2="20" y1="21" y2="16" />
          <line x1="20" x2="20" y1="12" y2="3" />
          <line x1="2" x2="6" y1="14" y2="14" />
          <line x1="10" x2="14" y1="8" y2="8" />
          <line x1="18" x2="22" y1="16" y2="16" />
        </svg>
      </button>
      <button
        onClick={() => updateViewSaveButton(!viewSaveButton)}
        className="tab-button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FFF"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-save"
        >
          <path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
          <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7" />
          <path d="M7 3v4a1 1 0 0 0 1 1h7" />
        </svg>
      </button>
      {viewSaveButton ? <SaveButton /> : null}
      <Link href={`./users/${session.user.userId}`}>
        <button className="tab-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FFF"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-user"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </button>
      </Link>
    </div>
  );
}
