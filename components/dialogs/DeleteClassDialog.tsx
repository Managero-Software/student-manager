import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteClass } from "@/lib/actions/class.actions";

const DeleteClassDialog = ({ classId }: { classId: string }) => {
  const deleteClassItem: React.MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    console.log(event);
    await deleteClass(classId);
    window.location.reload();
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>
          <FontAwesomeIcon
            height={24}
            width={24}
            className="hover:text-red-700"
            icon={faTrash}
          />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            class.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button className="shad-gray-btn">Cancel</Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button className="shad-primary-btn" onClick={deleteClassItem}>
              Delete
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteClassDialog;
