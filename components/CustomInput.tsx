import { Button } from "@/components/ui/button"           // Boutons stylisés
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"  // Kit formulaire
import { Input } from "@/components/ui/input"             // Champ de saisie
import { Control, FieldPath, Form } from 'react-hook-form'  // Gestion formulaireimport { z } from "zod"
import { z } from "zod"                                   // Validation
import { authFormSchema } from '@/lib/utils'              // Vos règles de validation


const formSchema = authFormSchema('sign-up') 

interface CustomInput{
    control: Control<z.infer<typeof formSchema>>,
    name: FieldPath<z.infer<typeof formSchema>>,
    label: string,
    placeholder: string
}

const CustomInput = ({control,name,label,placeholder} : CustomInput ) => {
  return (
    <FormField
        control={control}
        name={name}
        render={({ field }) => (
            <div className='form-item'>
                <FormLabel className='form-label'>
                    {label}
                </FormLabel>
                <div className='flex w-full flex-col'>
    
                    <FormControl>
                        <Input 
                            placeholder={placeholder}
                            className='input-class'
                            type={name==='password' ? 'password' : 'text'}
                            {...field}
                        />
                    </FormControl>
                    <FormMessage 
                        className='form-message mt-2'
                    />
    
                </div>
            </div>
        )}
    />
  )
}

export default CustomInput