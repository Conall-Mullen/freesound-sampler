import { useSamplerStore } from "../../../stores/useSamplerStore";
import { useSession } from "next-auth/react";
import SaveButton from "../SaveButton";
import Search from "../Search";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Stack } from "@chakra-ui/react";
import { LuSave, LuSearch, LuSlidersVertical, LuUser } from "react-icons/lu";

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
    <Stack>
      <div>
        <Button onClick={() => updateViewSearchBar(!viewSearchBar)}>
          <LuSearch />
        </Button>
        {viewSearchBar ? <Search /> : null}
      </div>
      <div>
        <Button
          onClick={() => {
            updateViewMixer(!viewMixer);
          }}
        >
          <LuSlidersVertical />
        </Button>
      </div>
      <div>
        <Button
          onClick={() => {
            updateViewSaveButton(!viewSaveButton);
          }}
        >
          <LuSave />
        </Button>

        {viewSaveButton ? <SaveButton /> : null}
      </div>
      <Link href={`./users/${session.user.userId}`}>
        <Button>
          <LuUser />
        </Button>
      </Link>
    </Stack>
  );
}
