Supabase table setup

1. Open your Supabase project dashboard: https://app.supabase.com
2. Select your project, then go to "SQL" -> "New Query".
3. Open `supabase/create_analyze_history_table.sql` and run the SQL to create the table.

Environment variables

Set the following env vars in your local environment or deployment settings:

- `SUPABASE_URL` => e.g. https://jwvhodmiwisgrypgprch.supabase.co
- `SUPABASE_KEY` => your anon/public API key (or service_role key if you need elevated privileges)

Local example (project root): create a `.env.local` file with:

```
SUPABASE_URL=https://jwvhodmiwisgrypgprch.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3dmhvZG1pd2lzZ3J5cGdwcmNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2MjMwODEsImV4cCI6MjA4MDE5OTA4MX0.yqdAqPfqm2wtrhfKjfQaaPkn25ihMsGVnfTfgrjBdg0

# (Optional) OPENAI_API_KEY=...
```

Security note: do NOT commit `.env.local` to source control if it contains secrets. Use deployment environment settings for production.
