'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing personalized habit suggestions to users.
 *
 * The flow takes user profile information, existing habits, and goals as input, and returns a list of suggested habits.
 *
 * @example
 * ```typescript
 * // Example usage:
 * const suggestions = await getPersonalizedHabitSuggestions({
 *   userProfile: { age: 30, interests: ['fitness', 'reading'] },
 *   existingHabits: ['exercise', 'read'],
 *   goals: ['improve health', 'learn new skills'],
 * });
 * console.log(suggestions);
 * ```
 *
 * @Exported Members:
 *   - `getPersonalizedHabitSuggestions`: A function that takes `PersonalizedHabitSuggestionsInput` and returns a `Promise` of `PersonalizedHabitSuggestionsOutput`.
 *   - `PersonalizedHabitSuggestionsInput`: The input type for the `getPersonalizedHabitSuggestions` function.
 *   - `PersonalizedHabitSuggestionsOutput`: The output type for the `getPersonalizedHabitSuggestions` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedHabitSuggestionsInputSchema = z.object({
  userProfile: z
    .object({
      age: z.number().describe('The user\u2019s age.'),
      interests: z.array(z.string()).describe('The user\u2019s interests.'),
    })
    .describe('Information about the user\u2019s profile.'),
  existingHabits: z.array(z.string()).describe('The user\u2019s existing habits.'),
  goals: z.array(z.string()).describe('The user\u2019s goals.'),
});

export type PersonalizedHabitSuggestionsInput = z.infer<
  typeof PersonalizedHabitSuggestionsInputSchema
>;

const PersonalizedHabitSuggestionsOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe('A list of personalized habit suggestions based on the user\u2019s profile, existing habits, and goals.'),
});

export type PersonalizedHabitSuggestionsOutput = z.infer<
  typeof PersonalizedHabitSuggestionsOutputSchema
>;

export async function getPersonalizedHabitSuggestions(
  input: PersonalizedHabitSuggestionsInput
): Promise<PersonalizedHabitSuggestionsOutput> {
  return personalizedHabitSuggestionsFlow(input);
}

const personalizedHabitSuggestionsPrompt = ai.definePrompt({
  name: 'personalizedHabitSuggestionsPrompt',
  input: {schema: PersonalizedHabitSuggestionsInputSchema},
  output: {schema: PersonalizedHabitSuggestionsOutputSchema},
  prompt: `Based on the user's profile, existing habits, and goals, suggest new habits that align with their interests and help them improve their life.\n\nUser Profile: Age: {{{userProfile.age}}}, Interests: {{#each userProfile.interests}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}\nExisting Habits: {{#each existingHabits}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}\nGoals: {{#each goals}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}\n\nSuggestions:`, // Ensure suggestions are returned as a string array as described in the output schema
});

const personalizedHabitSuggestionsFlow = ai.defineFlow(
  {
    name: 'personalizedHabitSuggestionsFlow',
    inputSchema: PersonalizedHabitSuggestionsInputSchema,
    outputSchema: PersonalizedHabitSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await personalizedHabitSuggestionsPrompt(input);
    return output!;
  }
);
