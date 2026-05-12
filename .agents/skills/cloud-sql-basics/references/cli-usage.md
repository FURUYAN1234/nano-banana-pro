# Cloud SQL CLI Usage

The `gcloud sql` command group is used to manage Cloud SQL instances and
related resources.

## Basic Syntax

```bash
gcloud sql [GROUP] [COMMAND] [FLAGS]
```

## Essential Commands

### Instance Management

- **Create an instance:**

  ```bash
  gcloud sql instances create my-instance --database-version=MYSQL_8_0 \
      --tier=db-f1-micro --region=us-central1
  ```

- **List instances:**

  ```bash
  gcloud sql instances list
  ```

- **Describe an instance:**

  ```bash
  gcloud sql instances describe my-instance
  ```

- **Restart an instance:**

  ```bash
  gcloud sql instances restart my-instance
  ```

### Database and User Management

- **Create a database:**

  ```bash
  gcloud sql databases create my-db --instance=my-instance
  ```

- **Create a user:**

  ```bash
  gcloud sql users create my-user --instance=my-instance \
      --password=my-password
  ```

### Operations and Backups

- **List operations:**

  ```bash
  gcloud sql operations list --instance=my-instance
  ```

- **Create a backup:**

  ```bash
  gcloud sql backups create --instance=my-instance
  ```

- **Restore from a backup:**

  ```bash
  gcloud sql backups restore backup_id --restore-instance=my-instance
  ```

## Common Flags

- `--project`: Specifies the project ID.

- `--region`: The region where the instance is located.

- `--format`: Changes output format (e.g., `json`, `yaml`).
