
"use client";

import { updateUser } from "@/lib/auth-client";
import {FloppyDisk} from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  FieldGroup,
  Fieldset,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";

export default function ProfilePage() {

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //get the data from the form
    const formData = new FormData(e.currentTarget);
    const userData =Object.fromEntries(formData.entries());
    console.log("Given form Data:",userData);
    

    //update the data
    const updateData = await updateUser({
      name: String(userData.name ?? ""),
      
    });
    console.log("Updated Data:",updateData);
    
  };

  return (
    <div className="flex justify-center items-center mt-10">
    <Form className="w-full max-w-96 " onSubmit={onSubmit}>
      <Fieldset>
        <Fieldset.Legend>Profile Settings</Fieldset.Legend>
        <Description>Update your profile information.</Description>
        <FieldGroup>

          <TextField
            isRequired
            name="name"
            validate={(value) => {
              if (value.length < 3) {
                return "Name must be at least 3 characters";
              }

              return null;
            }}
          >
            <Label>Name</Label>
            <Input placeholder="John Doe" />
            <FieldError />
          </TextField>


          <TextField isRequired name="email" type="email">
            <Label>Email</Label>
            <Input placeholder="john@example.com" />
            <FieldError />
          </TextField>
          

        </FieldGroup>


        <Fieldset.Actions>
          <Button type="submit">
            <FloppyDisk />
            Save changes
          </Button>
          <Button type="reset" variant="secondary">
            Cancel
          </Button>
        </Fieldset.Actions>


      </Fieldset>
    </Form>
 </div>
  );
}