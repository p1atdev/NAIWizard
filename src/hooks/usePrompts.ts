import { useEffect, useState } from "react"
import { useWizardState } from "../atoms/wizardState"
import { Prompt } from "../types/prompt"
import { WizardDB } from "../utils/db"
import { generateRandomId } from "../utils/random"

export const usePrompts = () => {
    const db = new WizardDB()
    const { wizardState } = useWizardState()
    const [prompts, setPrompts] = useState<Prompt[]>([])

    const deletePrompt = async (id: number) => {
        await db.deletePrompt(id)
    }

    useEffect(() => {
        const obserbable = (() => {
            switch (wizardState.type) {
                case "positive": {
                    return db.getPositivePrompts
                }
                case "negative": {
                    return db.getNegativePrompts
                }
            }
        })()

        const subscription = obserbable.subscribe(
            (prompts) =>
                setPrompts(
                    prompts.map((prompt) => {
                        return {
                            ...prompt,
                            spells: prompt.spells.map((spell) => ({
                                ...spell,
                                id: generateRandomId(),
                            })),
                        }
                    })
                ),
            (error) => setPrompts([])
        )

        return () => {
            subscription.unsubscribe()
            setPrompts([])
        }
    }, [wizardState])

    return {
        prompts,
        deletePrompt,
    }
}
