class CreateJobApplications < ActiveRecord::Migration[8.0]
  def change
    create_table :job_applications do |t|
      t.string :company_name
      t.string :position_title
      t.string :status
      t.date :applied_on
      t.boolean :starred

      t.timestamps
    end
  end
end
