import { useState } from "react";
import { LatLng, Marker } from "react-native-maps";
import { Button, Dialog } from "tamagui";

export const CustomMarker = (props: { coords: LatLng }) => {

    const [isOpen, setIsOpen] = useState(false);
  
    function showDialog() {
      setIsOpen(true);
    }
  
    function hideDialog() {
      setIsOpen(false);
    }
  
    return (
      <>
        <Dialog modal open={isOpen}>
          <Dialog.Trigger asChild>
            <Marker coordinate={props.coords} pinColor='navy' onPress={showDialog} />
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay />
            <Dialog.Content>
              <Dialog.Title />
              <Dialog.Description />
              <Dialog.Close>
                <Button onPress={hideDialog}>Cerrar</Button>
              </Dialog.Close>
              {/* ... */}
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog>
      </>
    );
  }